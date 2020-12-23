import DashboardFactory from '../dashboard/DashboardFactory';
import {
    ABSOLUTE_MEASURE_UNIT,
    COEFFICIENT_MEASURE_UNIT
} from '../../constants/constants';

import Data from '../data/Data';

export default class App {
    constructor() {
        this.isAllPeriod = true;
        this.isAbsoluteUnit = true;
        this.buttonGlobalCategory = document.querySelector('.slider-global-cases ');
        this.buttonCountriesCategory = document.querySelector('.slider-countries-cases');
        this.buttonChangePeriod = document.querySelector('.slider__period');
        this.buttonChangeUnit = document.querySelector('.slider__unit');
        this.dashboard = null;
        this.factory = new DashboardFactory();
        this.globalInfo = null
    }

    async run() {
        this.dashboard = this.factory.create('absolute', this.isAllPeriod);
        this.dashboard.run();
        this.buttonGlobalCategory.addEventListener('click', () => this.changeGlobalInfo(event, this.dashboard));
        this.buttonCountriesCategory.addEventListener('click', () => this.changeCountriesInfo(event, this.dashboard));
        this.buttonChangePeriod.addEventListener('click', () => this.changePeriod());
        this.buttonChangeUnit.addEventListener('click', () => this.changeUnit());
    }

    changePeriod() {
        this.isAllPeriod = !this.isAllPeriod;
        if (this.isAbsoluteUnit) {
            this.dashboard = this.factory.create(ABSOLUTE_MEASURE_UNIT, this.isAllPeriod);
            this.dashboard.run();
        } else {
            this.dashboard = this.factory.create(COEFFICIENT_MEASURE_UNIT, this.isAllPeriod);
            this.dashboard.run();
        }
    }

    changeUnit() {
        this.isAbsoluteUnit = !this.isAbsoluteUnit;
        if (!this.isAbsoluteUnit) {
            this.dashboard = this.factory.create(COEFFICIENT_MEASURE_UNIT, this.isAllPeriod);
            this.dashboard.run();
        } else {
            this.dashboard = this.factory.create(ABSOLUTE_MEASURE_UNIT, this.isAllPeriod);
            this.dashboard.run();
        }
    }

    changeGlobalInfo(event, instance) {
        if (event.target.classList.contains('slider-global-cases__right')) {
            instance.changeInfo(true);
        } else if (event.target.classList.contains('slider-global-cases__left')) {
            instance.changeInfo(true, true);
        }
    }

    changeCountriesInfo(event, instance) {
        if (event.target.classList.contains('slider-countries-cases__right')) {
            instance.changeInfo(false);
        } else if (event.target.classList.contains('slider-countries-cases__left')) {
            instance.changeInfo(false, true);
        }
    }
}
