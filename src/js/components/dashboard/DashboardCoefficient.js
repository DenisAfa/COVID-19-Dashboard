import {
    WORLD_POPULATION,
    ONE_HUNDRED_PEOPLE
} from '../../constants/constants';
import create from '../../utils/create';
import Dashboard from './Dashboard';

export default class DashboardWithCoefficient extends Dashboard {
    showGlobalConfirmedData() {
        const line = create('tr', '', '', '');
        if (this.isAllPeriod) {
            const totalConfirmedCoefficient = (this.globalInfo.TotalConfirmed / WORLD_POPULATION)
                                                                             * ONE_HUNDRED_PEOPLE;
            create('td', '', totalConfirmedCoefficient, line);
        } else {
            const NewConfirmedCoefficient = (this.globalInfo.NewConfirmed / WORLD_POPULATION)
                                                                        * ONE_HUNDRED_PEOPLE;
            create('td', '', NewConfirmedCoefficient, line);
        }
    }

    showGlobalDeathsData() {
        const line = create('tr', '', '', '');
        if (this.isAllPeriod) {
            const totalDeathsCoefficient = (this.globalInfo.TotalDeaths / WORLD_POPULATION)
                                                                     * ONE_HUNDRED_PEOPLE;
            create('td', '', totalDeathsCoefficient, line);
        } else {
            const newDeathsCoefficient = (this.globalInfo.NewDeaths / WORLD_POPULATION)
                                                                     * ONE_HUNDRED_PEOPLE;
            create('td', '', newDeathsCoefficient, line);
        }
    }

    showGlobalRecoveredData() {
        const line = create('tr', '', '', '');
        if (this.isAllPeriod) {
            const totalRecoveredCoefficient = (this.globalInfo.TotalRecovered / WORLD_POPULATION)
                                                                             * ONE_HUNDRED_PEOPLE;
            create('td', '', totalRecoveredCoefficient, line);
        } else {
            const newRecoveredCoefficient = (this.globalInfo.NewRecovered / WORLD_POPULATION)
                                                                         * ONE_HUNDRED_PEOPLE;
            create('td', '', newRecoveredCoefficient, line);
        }
    }

    showCountiesConfirmedData() {
        if (this.isAllPeriod) {
            this.countriesInfo.sort((prev, next) => next.TotalConfirmed - prev.TotalConfirmed)
                .forEach((country) => {
                    this.createCountryInfo(country, 'TotalConfirmed');
                });
        } else {
            this.countriesInfo.sort((prev, next) => next.NewConfirmed - prev.NewConfirmed)
                .forEach((country) => {
                    this.createCountryInfo(country, 'NewConfirmed');
                });
        }
    }

    showCountiesDeathsData() {
        if (this.isAllPeriod) {
            this.countriesInfo.sort((prev, next) => next.TotalDeaths - prev.TotalDeaths)
                .forEach((country) => {
                    this.createCountryInfo(country, 'TotalDeaths');
                });
        } else {
            this.countriesInfo.sort((prev, next) => next.NewDeaths - prev.NewDeaths)
                .forEach((country) => {
                    this.createCountryInfo(country, 'NewDeaths');
                });
        }
    }

    showCountiesRecoveredData() {
        if (this.isAllPeriod) {
            this.countriesInfo.sort((prev, next) => next.TotalRecovered - prev.TotalRecovered)
                .forEach((country) => {
                    this.createCountryInfo(country, 'TotalRecovered');
                });
        } else {
            this.countriesInfo.sort((prev, next) => next.NewRecovered - prev.NewRecovered)
                .forEach((country) => {
                    this.createCountryInfo(country, 'NewRecovered');
                });
        }
    }

    createCountryInfo(country, countryParam) {
        const countryName = country.Country;
        const countryParameter = country[countryParam];
        const countryInfo = this.population.find((countryFind) => countryFind.name === countryName);
        if (countryInfo) {
            const countryPopulation = countryInfo.population;
            const NewCountryConfirmedCoefficient = (countryParameter / countryPopulation)
                                                                 * ONE_HUNDRED_PEOPLE;
            const line = create('tr', '', '', '');
            create('td', '', countryName, line);
            create('td', '', NewCountryConfirmedCoefficient, line);
        }
    }
}
