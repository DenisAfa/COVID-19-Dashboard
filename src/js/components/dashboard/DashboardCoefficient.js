import {
    WORLD_POPULATION,
    ONE_HUNDRED_PEOPLE
} from '../../constants/constants';
import create from '../../utils/create';
import Dashboard from './Dashboard';

export default class DashboardWithCoefficient extends Dashboard {
    showGlobalData(infoParameter) {
        const globalCases = document.querySelector('.global-cases__volume');
        const totalParameterCoefficient = ((this.globalInfo[infoParameter] / WORLD_POPULATION)
                                                                             * ONE_HUNDRED_PEOPLE).toFixed(2);
        globalCases.textContent = totalParameterCoefficient;
    }

    showCountiesData(countryInfoParameter) {
        const table = document.querySelector('.countries-cases__content');
        table.innerHTML = '';
        this.countriesInfo.forEach((country) => {
                this.createCountryInfo(country, countryInfoParameter, table);
            });
        const lines = document.querySelectorAll('tr');
        const columnNumber = 1
        const sortedRows = Array.from(lines)
            .slice(1)
            .sort((rowA, rowB) => Number(rowB.cells[columnNumber].innerHTML) - Number(rowA.cells[columnNumber].innerHTML))
        table.innerHTML = '';
        table.append(...sortedRows);
       
    }

    createCountryInfo(country, countryParam, table) {
        const countryName = country.Country;
        const countryParameter = country[countryParam];
        const countryInfo = this.population.find((countryFind) => countryFind.name === countryName);
        if (countryInfo) {
            const countryPopulation = countryInfo.population;
            const NewCountryConfirmedCoefficient = String(((countryParameter / countryPopulation)
                                                                 * ONE_HUNDRED_PEOPLE).toFixed(2));
            const line = create('tr', 'table__line', '', table);
            create('td', 'table__country', countryName, line);
            create('td', '', NewCountryConfirmedCoefficient, line);
            const countryFlagInfo = this.population.find((countryFind) => countryFind.name === countryName);
            let countryFlagUrl;
            if (countryFlagInfo) {
                countryFlagUrl = countryFlagInfo.flag;
                create('img', 'country__flag', '', line, ['src', countryFlagUrl], ['alt', 'flag']);
            } else if (this.population.find((countryFind) => countryFind.name.includes(countryName))) {
                const countryFlagInfo = this.population.find((countryFind) => countryFind.name.includes(countryName));
                countryFlagUrl = countryFlagInfo.flag;
                create('img', 'country__flag', '', line, ['src', countryFlagUrl], ['alt', 'flag']);
            } else {
                create('img', 'country__flag', '', line);
            }
        }
    }
}
