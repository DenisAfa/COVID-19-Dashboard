import Data from '../data/Data';
import {
    MONTHS,
    TOTAL_CONFIRMED
} from '../../constants/constants';

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
                labels: MONTHS,
                datasets: [
                    {
                        label: TOTAL_CONFIRMED,
                        backgroundColor: 'rgba(200, 0, 0, 0.1)',
                        borderColor: 'rgb(255, 0, 0)',
                        data: [60000000, 74000000, 96000000]
                    }
                ]
            },

            options: {
                responsive: false
            }
        });
    }
}
