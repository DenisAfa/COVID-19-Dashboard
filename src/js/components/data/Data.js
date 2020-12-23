import getData from '../../utils/getData';

export default class Data {
    constructor() {
        this.data = null;
        this.population = null;
    }

    async run() {
        await this.initData();
    }

    async initData() {
        const data = await getData('https://api.covid19api.com/summary');
        const population = await getData('https://restcountries.eu/rest/v2/all?fields=name;population;flag');
        this.data = data;
        this.population = population;
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

    async getGlobalPeriodData() {
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const data = await getData(`https://api.covid19api.com/world?from=2020-09-01T00:00:00Z&to=${today}T00:00:00Z`);
        return data.sort((prev, next) => next.TotalConfirmed - prev.TotalConfirmed);
    }

    async getCountryPeriodData(country) {
        const date = new Date();
        const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const data = await getData(`https://api.covid19api.com/country/${country}?from=2020-09-01T00:00:00Z&to=${today}T00:00:00Z`);
        return data;
    }
}
