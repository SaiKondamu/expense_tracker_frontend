import { LightningElement, api, track} from 'lwc' ;

const SERVER_URL = 'http://localhost:3004';

export default class Home extends LightningElement {
    
    @api title = 'Expense Tracker Home';
    @api description = 'Welcome to the Expense Tracker application. Here you can manage your expenses efficiently.';

    @track
    expenses = [];
    
    async connectedCallback() {
        console.log('Home component connected');
        const result = await this.getExpenses();
        if (result) {
            console.log(`Expenses fetched: ${JSON.stringify(result)}`);
            this.expenses = result.totalSize > 0 ? result.records : [];
        } else {
            console.error('Failed to fetch expenses');
        }
    }
    
    async getExpenses(){
        const url = '/expenses';
        const response = await this.makeApiRequest(url);
        console.log(`expenses: ${JSON.stringify(response)}`);
        return response;
    }


    async makeApiRequest(url, method = 'GET', body = null) {
        try{
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        if (body) {
            options.body = JSON.stringify(body);
        }
        
        const response = await fetch(`${SERVER_URL}${url}`, options)
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(error) {
            console.error('Error in makeApiRequest:', error);
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
}
