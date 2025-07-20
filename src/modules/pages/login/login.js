import { LightningElement, api} from 'lwc' ;

export default class Login extends LightningElement {
    
    @api title = 'Expense Tracker Home';
    @api description = 'Welcome to the Expense Tracker application. Here you can manage your expenses efficiently.';
    
    connectedCallback() {
        console.log('Login component connected');
    }
    
    handleButtonClick() {
        console.log('Button clicked in Home component');
    }
}
