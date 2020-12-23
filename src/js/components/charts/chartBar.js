import Data from '../data/Data';

export default class chartBar {
    constructor() {
        this.globalInfo4 = null;
    }

    async create() {
        const dataNew = new Data();
        await dataNew.initData()
        .then(() => {
            this.globalInfo4 = dataNew.getGlobalPeriodData();
            console.log(this.globalInfo4)
        });
        var ctx = document.getElementById('chartBar').getContext('2d');
        var chart = new Chart(ctx, {
    type: 'bar',

    data: {
        labels: ['Сентябрь', 'Октябрь', 'Ноябрь'],
        datasets: [{
            label: 'Total Information',
            backgroundColor: 'rgba(200, 0, 0, 0.4)',
            borderColor: 'rgb(255, 0, 0)',
            data: [this.globalInfo4[112].NewDeaths, this.globalInfo4[50].NewDeaths, this.globalInfo4[0].NewDeaths]
        }]
    },

    options: {
        responsive: false
    }
});
    }
}