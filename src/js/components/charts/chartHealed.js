import Data from '../data/Data';
import {
    MONTHS,
    TOTAL_RECOVERED
} from '../../constants/constants';

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
                labels: MONTHS,
                datasets: [{
                    label: TOTAL_RECOVERED,
                    backgroundColor: 'rgba(200, 0, 0, 0.1)',
                    borderColor: 'rgb(255, 0, 0)',
                    data: [38000000, 46000000, 53000000]
                }]
            },

            options: {
                responsive: false
            }
        });
    }
}
