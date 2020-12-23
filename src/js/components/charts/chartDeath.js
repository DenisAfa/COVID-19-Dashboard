import Data from '../data/Data';

export default class chartDeath {
    constructor() {
        this.globalInfo2 = null;
    }

    async create() {
        const data = new Data();
        await data.initData()
        .then(() => {
            this.globalInfo2 = data.getGlobalPeriodData();
            console.log(this.globalInfo2)
        });
        var ctx = document.getElementById('myChartDeath').getContext('2d');
        var chart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: ['Сентябрь', 'Октябрь', 'Ноябрь'],
        datasets: [{
            label: 'Total deaths',
            backgroundColor: 'rgba(200, 0, 0, 0.1)',
            borderColor: 'rgb(255, 0, 0)',
            data: [this.globalInfo2[112].TotalDeaths, this.globalInfo2[50].TotalDeaths, this.globalInfo2[0].TotalDeaths]
        }]
    },

    options: {
        responsive: false
    }
});
    }
}