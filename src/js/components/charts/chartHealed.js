import Data from '../data/Data';

export default class chartHealed {
    constructor() {
        this.globalInfo3 = null;
    }

    async create() {
        const data = new Data();
        await data.initData()
            .then(() => {
                this.globalInfo3 = data.getGlobalPeriodData();
            });
        const ctx = document.getElementById('myChartHealed').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',

            data: {
                labels: ['Сентябрь', 'Октябрь', 'Ноябрь'],
                datasets: [{
                    label: 'Total recovered',
                    backgroundColor: 'rgba(200, 0, 0, 0.1)',
                    borderColor: 'rgb(255, 0, 0)',
                    data: [this.globalInfo3[112].TotalRecovered, this.globalInfo3[50].TotalRecovered, this.globalInfo3[0].TotalRecovered]
                }]
            },

            options: {
                responsive: false
            }
        });
    }
}
