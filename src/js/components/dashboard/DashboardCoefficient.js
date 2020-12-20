import {
    WORLD_POPULATION,
    ONE_HUNDRED_PEOPLE
} from '../../constants/constants';
import create from '../../utils/create';
import Dashboard from './Dashboard';

export default class DashboardWithCoefficient extends Dashboard {
    showGlobalData(infoParameter) {
        const globalCases = document.querySelector('.global-cases__global-volume');
        const totalParameterCoefficient = ((this.globalInfo[infoParameter] / WORLD_POPULATION)
                                                                             * ONE_HUNDRED_PEOPLE).toFixed(2);
        globalCases.textContent = totalParameterCoefficient

    }

    showCountiesData(countryInfoParameter) {
        const table = document.querySelector('.countries-cases__content');
        table.innerHTML = ''
        this.countriesInfo.sort((prev, next) => next[countryInfoParameter] - prev[countryInfoParameter])
            .forEach((country) => {
                this.createCountryInfo(country, countryInfoParameter, table);
            });

    }

    createCountryInfo(country, countryParam, table) {
        const countryName = country.Country;
        const countryParameter = country[countryParam];
        const countryInfo = this.population.find((countryFind) => countryFind.name === countryName);
        if (countryInfo) {
            const countryPopulation = countryInfo.population;
            const NewCountryConfirmedCoefficient = String(((countryParameter / countryPopulation)
                                                                 * ONE_HUNDRED_PEOPLE).toFixed(2));
            const line = create('tr', '', '', table);
            create('td', '', countryName, line);
            create('td', '', NewCountryConfirmedCoefficient, line);
        }
    }
}
