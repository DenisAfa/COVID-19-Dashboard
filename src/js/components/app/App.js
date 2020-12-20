import DashboardFactory from '../dashboard/DashboardFactory'

export default class App {
    constructor() {
        this.isAllPeriod = true
    }
    run() {
        const dashboards = new DashboardFactory(this.isAllPeriod);
        const dash = dashboards.create()
        dash.run();
        const button = document.querySelector('.nextButton');
        button.addEventListener('click',() => dash.changeGlobalInfo());
        this.changePeriodInfo();
        this.changeUnitInfo();
    }

    changePeriodInfo() {
        const sliderPeriod = document.querySelector('.slider__period');
        sliderPeriod.addEventListener('click', this.changePeriod);
    }

    changeUnitInfo() {
        const sliderUnit = document.querySelector('.slider__unit');
        sliderUnit.addEventListener('click', this.changeUnit);
    }

    changePeriod() {
        this.isAllPeriod = !this.isAllPeriod;
        const dashboards = new DashboardFactory(!this.isAllPeriod);
        const dash = dashboards.create()
        dash.run();
        const button = document.querySelector('.nextButton');
        button.addEventListener('click',() => dash.changeGlobalInfo());
        console.log(dash.run)
    }

    changeUnit() {
        const dashboards = new DashboardFactory(this.isAllPeriod);
        const dash = dashboards.create('coefficient')
        dash.run();
        console.log('1unit')
    }

}

