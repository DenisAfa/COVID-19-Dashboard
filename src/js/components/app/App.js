import DashboardFactory from '../dashboard/DashboardFactory'

export default class App {
    run() {
        const dashboards = new DashboardFactory();
        const dash = dashboards.create()
        dash.run()
    }
}

