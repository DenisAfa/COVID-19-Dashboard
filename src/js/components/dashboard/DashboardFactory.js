import Dashboard from './Dashboard';
import DashboardWithCoefficient from './DashboardCoefficient';

export default class DashboardFactory {
    static list = {
        absolute: Dashboard,
        coefficient: DashboardWithCoefficient
    };

    create(type = 'absolute', isAllPeriod) {
        const MyDashboard = DashboardFactory.list[type];
        const board = new MyDashboard(isAllPeriod);
        return board;
    }
}
