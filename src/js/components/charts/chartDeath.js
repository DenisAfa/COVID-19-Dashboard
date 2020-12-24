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
            });
        const ctx = document.getElementById('myChartDeath').getContext('2d');
        const chart = new Chart(ctx, {
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
