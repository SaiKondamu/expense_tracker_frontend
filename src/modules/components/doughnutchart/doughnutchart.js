import { LightningElement, api} from 'lwc' ;

import Chart from 'chart.js/auto';

export default class Doughnutchart extends LightningElement {
    
    @api title = 'Nav bar';
    @api description = 'Welcome to the Expense Tracker application. Here you can manage your expenses efficiently.';

    _data = [];
    _labels = [];
    
    chart;
    
    chartLoaded = false;

    @api 
    get chartRecords(){
        return this._data
    }   
    set chartRecords(records){
        console.log(`Setting data in doughnutchart`);
        console.log(`Records: ${JSON.stringify(records)}`);
        this._data = [...records.results];
        this._labels = [...records.labels];
        if(this.chartLoaded) {
            const elem = this.template.querySelector('.chart');
            elem.innerHTML = ''; // Clear previous chart
            this.chart.destroy();
            this.chartLoaded = false;
            this.renderChart();
        }
        console.log(`Data set in doughnutchart: ${JSON.stringify(this._data)}`);
        console.log(`Labels set in doughnutchart: ${JSON.stringify(this._labels)}`);
        //this.renderChart();
    }          

    connectedCallback() {
        console.log('Login component connected');
    }

    renderedCallback() {
        const elem = this.template.querySelector('.chart');
        if (elem) {
            this.renderChart();
        }
    }

    renderChart(){
        if(this.chartLoaded){
            return;
        }
        const elem = this.template.querySelector('.chart');
        const config = {
            type : 'doughnut',
            data : {
                labels: this._labels,
                datasets: [{
                    label: 'My First Dataset',
                    data: this._data,
                    hoverOffset: 4
                }]
            }
        };
        const canvas = document.createElement('canvas');
        elem.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        this.chart = new Chart(ctx, config);
        this.chartLoaded = true;
    }
    
    handleButtonClick() {
        console.log('Button clicked in Home component');
    }
}