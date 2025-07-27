import { LightningElement, api} from 'lwc' ;

const SERVER_URL = 'http://localhost:3002'
export default class Navbar extends LightningElement {
    
    @api title = 'Nav bar';
    @api description = 'Welcome to the Expense Tracker application. Here you can manage your expenses efficiently.';
    
    @api loggedInUser;

    get username() {
        return this.loggedInUser ? this.loggedInUser.username : 'Guest';
    }

    get logoutUrl() {
        return `${SERVER_URL}/oauth2/logout`;
    }
    
    connectedCallback() {
        console.log('Login component connected');
    }
    
    handleButtonClick() {
        console.log('Button clicked in Home component');
    }
}