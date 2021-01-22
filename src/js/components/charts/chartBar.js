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
            });
        const ctx = document.getElementById('chartBar').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',

            data: {
                labels: ['Сентябрь', 'Октябрь', 'Ноябрь'],
                datasets: [{
                    label: 'Total Information',
                    backgroundColor: 'rgba(200, 0, 0, 0.4)',
                    borderColor: 'rgb(255, 0, 0)',
                    data: [1680000, 1750000, 2050000]
                }]
            },

            options: {
                responsive: false
            }
        });
    }
}
