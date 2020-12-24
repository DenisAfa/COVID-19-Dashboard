import Data from '../data/Data';

export default class chart {
    constructor() {
        this.globalInfo1 = null;
    }

    async create() {
        const data = new Data();
        await data.initData()
            .then(() => {
                this.globalInfo1 = data.getGlobalPeriodData();
            });
        const ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',

            data: {
                labels: ['Сентябрь', 'Октябрь', 'Ноябрь'],
                datasets: [
                    {
                        label: 'Total Confirmed',
                        backgroundColor: 'rgba(200, 0, 0, 0.1)',
                        borderColor: 'rgb(255, 0, 0)',
                        data: [this.globalInfo1[112].TotalConfirmed, this.globalInfo1[50].TotalConfirmed, this.globalInfo1[0].TotalConfirmed]
                    }
                ]
            },

            options: {
                responsive: false
            }
        });
    }
}
