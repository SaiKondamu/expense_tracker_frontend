import { LightningElement, api, track} from 'lwc' ;

const SERVER_URL = 'http://localhost:3004';
const BACKEND_URL = 'http://localhost:3002';

export default class Home extends LightningElement {
    
    @api title = 'Expense Tracker Home';
    @api description = 'Welcome to the Expense Tracker application. Here you can manage your expenses efficiently.';

    @track
    expenses = [];
    loggedInUser = null;

    showSpinner = false;

    chartData = {};
    
    get showchartData() {
        return this.chartData && Object.keys(this.chartData).length > 0;
    }
    
    async connectedCallback() {
        try{
            const user = await this.getLoggedInUser();
            console.log(`Logged in user: ${JSON.stringify(user)}`);
            if(!user || !user.user_id) {
                console.error('User not logged in or user ID not found');
                //window.location.href = '/login';
                this.expenses = [];
                console.log('Redirecting to login page');
                return;
            }else{
                this.loggedInUser = user;
                console.log('Home component connected');
                const result = await this.getExpenses();
                if (result) {
                    this.expenses = result.length > 0 ? result : [];
                    console.log(`Expenses fetched: ${JSON.stringify(this.expenses)}`);
                    this.createChartData();
                } else {
                    console.error('Failed to fetch expenses');
                }
            }
        }catch(error){
            console.error('Error in connectedCallback:', error);
            this.expenses = [];
            return;
        }
        // console.log('Home component connected');
        // const result = await this.getExpenses();
        // if (result) {
        //     console.log(`Expenses fetched: ${JSON.stringify(result)}`);
        //     this.expenses = result.totalSize > 0 ? result.records : [];
        // } else {
        //     console.error('Failed to fetch expenses');
        // }
    }

    async getLoggedInUser(){
        console.log('Fetching logged in user');
        const url = `${BACKEND_URL}/oauth2/whoami`;
        return await this.makeApiRequest(url);
    }
    
    async getExpenses(){
        const url = `${BACKEND_URL}/expenses`;
        const response = await this.makeApiRequest(url);
        console.log(`expenses: ${JSON.stringify(response)}`);
        return response;
    }


    async makeApiRequest(url, method = 'GET', body = null) {
        try{
            this.showSpinner = true;
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        if (body) {
            options.body = JSON.stringify(body);
        }
        console.log
        const response = await fetch(`${url}`, options)
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch(error) {
            console.error('Error in makeApiRequest:', error);
    }   
    finally{
        this.showSpinner = false;
    }
    }
    handleButtonClick() {
        console.log('Button clicked in Home component');
    }

    showHandler(event){
        const row = event.detail;
        console.log(`Show details action for row: ${JSON.stringify(row)}`);
        // Implement show details logic here
    }
    editHandler(event) {
        const row = event.detail;
        console.log(`Edit action for row: ${JSON.stringify(row)}`);
        // Implement edit logic here
    }
    deleteHandler(event) {
        const row = event.detail;
        console.log(`Delete action for row: ${JSON.stringify(row)}`);
        // Implement delete logic here
    }

    createChartData() {
        try{

        console.log('Creating chart data');
        const aggr = this.expenses.reduce((acc, expense) => {
            const category = expense.Category__c || 'Uncategorized';
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += parseFloat(expense.Amount__c);
            return acc;
        }, {});

        console.log(`Chart data: ${JSON.stringify(aggr)}`);

        this.chartData = {
            labels: Object.keys(aggr),
            results: Object.values(aggr)
        };
        console.log(`Chart data: ${JSON.stringify(this.chartData)}`);

        }catch(error) {
            console.error('Error creating chart data:', error);
        }
    }
}
