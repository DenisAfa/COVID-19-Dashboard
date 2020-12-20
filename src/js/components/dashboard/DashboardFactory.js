import Dashboard from './Dashboard';
import DashboardWithCoefficient from './DashboardCoefficient';

export default class DashboardFactory {
    constructor(isAllPeriod) {
        this.isAllPeriod = isAllPeriod
    }
    static list = {
        absolute: Dashboard,
        coefficient: DashboardWithCoefficient
    };

    create(type = 'absolute') {
        const myDashboard = DashboardFactory.list[type];
        const board = new myDashboard(this.isAllPeriod);
        console.log(this.isAllPeriod)
        return board;
    }
}