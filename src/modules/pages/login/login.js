import { LightningElement, api} from 'lwc' ;

const SERVER_URL =  'https://expense-tracker-backend-2qoi.onrender.com' || 'http://localhost:3002';
export default class Login extends LightningElement {
    
    get loginUrl() {
        return `${SERVER_URL}/oauth2/login`;
    }

    @api title = 'Expense Tracker Home';
    @api description = 'Welcome to the Expense Tracker application. Here you can manage your expenses efficiently.';
    
    connectedCallback() {
        console.log('Login component connected');
    }
    
    handleButtonClick() {
        console.log('Button clicked in Home component');
    }
}
