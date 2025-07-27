import { LightningElement, api} from 'lwc' ;

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const COLUMNS = [
    { label: 'Name', fieldName: 'Expense_Name__c', type: 'text', hideDefaultActions: true },
    { label: 'Amount', fieldName: 'Amount__c', type: 'currency', cellAttributes: { alignment: 'left'}, typeAttributes: { currencyCode: 'USD' , step: '0.001'} },
    { label: 'Expense Date', fieldName: 'Date__c', type: 'date' },
    { label: 'Category', fieldName: 'Category__c', type: 'text' },
    { label: 'Notes', fieldName: 'Notes__c', type: 'text'},
    { type: 'action', typeAttributes: { rowActions: actions } }
]
export default class Expensedatatable extends LightningElement {
    
    @api title = 'Nav bar';
    @api description = 'Welcome to the Expense Tracker application. Here you can manage your expenses efficiently.';
    
    keyfield = 'Id';
    _data = [];
    columns = COLUMNS;

    @api 
    set data(rows){
        console.log(`Setting data in expensedatatable: ${JSON.stringify(rows)}`);
        this._data = [...rows];
    }

    get data(){
        return this._data;
    }
    
    connectedCallback() {
        console.log('Expensedatatable component connected');
    }
    
    handleButtonClick() {
        console.log('Button clicked in Home component');
    }

    handleRowAction(event){
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log(`Action: ${actionName}, Row: ${JSON.stringify(row)}`);
        
        switch (actionName) {
            case 'show_details':
                this.sendMessageToParent('show', row);
                break;
            case 'edit':
                this.sendMessageToParent('edit', row);
                break;
            case 'delete':
                this.sendMessageToParent('delete', row);
                break;
            default:
                console.error(`Unknown action: ${actionName}`);
        }
    }

    sendMessageToParent(event_name, row) {
        const event = new CustomEvent(event_name, {
            detail: row
        });
        this.dispatchEvent(event);
    }
}