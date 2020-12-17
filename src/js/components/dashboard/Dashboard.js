import Data from '../data/Data';
import create from '../../utils/create';

export default class Dashboard {
    constructor() {
        this.globalInfo = null;
        this.countriesInfo = null;
        this.isAllPeriod = true;
        this.population = null;
    }

    async run() {
        await this.getData();
        this.showGlobalConfirmedData();
        this.showGlobalDeathsData();
        this.showGlobalRecoveredData();
        this.showCountiesConfirmedData();
        this.showCountiesDeathsData();
        this.showCountiesRecoveredData();
    }

    async getData() {
        const data = new Data();
        await data.run()
            .then(() => {
                this.globalInfo = data.getGlobalData();
                this.countriesInfo = data.getCountriesData();
                this.population = data.getPopulationAndFlagData();
            });
    }

    showGlobalConfirmedData() {
        const line = create('tr', '', '', '');
        if (this.isAllPeriod) {
            create('td', '', this.globalInfo.TotalConfirmed, line);
        } else {
            create('td', '', this.globalInfo.NewConfirmed, line);
        }
    }

    showGlobalDeathsData() {
        const line = create('tr', '', '', '');
        if (this.isAllPeriod) {
            create('td', '', this.globalInfo.TotalDeaths, line);
        } else {
            create('td', '', this.globalInfo.NewDeaths, line);
        }
    }

    showGlobalRecoveredData() {
        const line = create('tr', '', '', '');
        if (this.isAllPeriod) {
            create('td', '', this.globalInfo.TotalRecovered, line);
        } else {
            create('td', '', this.globalInfo.NewRecovered, line);
        }
    }

    showCountiesConfirmedData() {
        if (this.isAllPeriod) {
            this.countriesInfo.sort((prev, next) => next.TotalConfirmed - prev.TotalConfirmed)
                .forEach((country) => {
                    const line = create('tr', '', '', '');
                    create('td', '', country.Country, line);
                    create('td', '', country.TotalConfirmed, line);
                });
        } else {
            this.countriesInfo.sort((prev, next) => next.NewConfirmed - prev.NewConfirmed)
                .forEach((country) => {
                    const line = create('tr', '', '', '');
                    create('td', '', country.Country, line);
                    create('td', '', country.NewConfirmed, line);
                });
        }
    }

    showCountiesDeathsData() {
        if (this.isAllPeriod) {
            this.countriesInfo.sort((prev, next) => next.TotalDeaths - prev.TotalDeaths)
                .forEach((country) => {
                    const line = create('tr', '', '', '');
                    create('td', '', country.Country, line);
                    create('td', '', country.TotalDeaths, line);
                });
        } else {
            this.countriesInfo.sort((prev, next) => next.NewDeaths - prev.NewDeaths)
                .forEach((country) => {
                    const line = create('tr', '', '', '');
                    create('td', '', country.Country, line);
                    create('td', '', country.NewDeaths, line);
                });
        }
    }

    showCountiesRecoveredData() {
        if (this.isAllPeriod) {
            this.countriesInfo.sort((prev, next) => next.TotalRecovered - prev.TotalRecovered)
                .forEach((country) => {
                    const line = create('tr', '', '', '');
                    create('td', '', country.Country, line);
                    create('td', '', country.TotalRecovered, line);
                });
        } else {
            this.countriesInfo.sort((prev, next) => next.NewRecovered - prev.NewRecovered)
                .forEach((country) => {
                    const line = create('tr', '', '', '');
                    create('td', '', country.Country, line);
                    create('td', '', country.NewRecovered, line);
                });
        }
    }

    switchPeriod() {
        this.isAllPeriod = !this.isAllPeriod;
    }
}
