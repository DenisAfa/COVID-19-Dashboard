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
                    data: [1500000, 1700000, 2050000]
                }]
            },

            options: {
                responsive: false
            }
        });
    }
}
