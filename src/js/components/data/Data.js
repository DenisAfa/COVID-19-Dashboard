import getData from '../../utils/getData';
import {
    DATA_URL,
    POPULATION_URL
} from '../../constants/constants';

export default class Data {
    constructor() {
        this.data = null;
        this.population = null;
        this.dataPeriodGlobal = null;
        this.dataPeriodCountry = null;
    }

    async initData(country) {
        const data = await getData(DATA_URL);
        const population = await getData(POPULATION_URL);
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const dataPeriodGlobal = await getData(`https://api.covid19api.com/world?from=2020-09-01T00:00:00Z&to=${today}T00:00:00Z`);
        dataPeriodGlobal.sort((prev, next) => next.TotalConfirmed - prev.TotalConfirmed);
        let dataPeriodCountry;
        if (country) {
            dataPeriodCountry = await getData(`https://api.covid19api.com/country/${country}?from=2020-09-01T00:00:00Z&to=${today}T00:00:00Z`);
        }

        this.data = data;
        this.population = population;
        this.periodGlobalData = dataPeriodGlobal;
        this.dataPeriodCountry = dataPeriodCountry;
    }

    getGlobalData() {
        return this.data.Global;
    }

    getCountriesData() {
        return this.data.Countries;
    }

    getPopulationAndFlagData() {
        return this.population;
    }

    getGlobalPeriodData() {
        return this.periodGlobalData;
    }

    getCountryPeriodData() {
        return this.dataPeriodCountry;
    }
}
