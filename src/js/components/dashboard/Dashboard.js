import Data from '../data/Data';
import create from '../../utils/create';
import {
    TOTAL_CONFIRMED,
    NEW_CONFIRMED,
    TOTAL_DEATHS,
    NEW_DEATHS,
    TOTAL_RECOVERED,
    NEW_RECOVERED,
    GLOBAL_CASES,
    DEATHS_CASES,
    RECOVERED_CASES,
    SHOW_GLOBAL_INFO,
    SHOW_COUNTRIES_INFO
} from '../../constants/constants';

export default class Dashboard {
    constructor(isAllPeriod) {
        this.globalInfo = null;
        this.countriesInfo = null;
        this.population = null;
        this.isAllPeriod = isAllPeriod;
    }

    async run() {
        await this.getData();
        if (this.isAllPeriod) {
            this.showGlobalData(TOTAL_CONFIRMED);
            this.showCountiesData(TOTAL_CONFIRMED);
        } else {
            this.showGlobalData(NEW_CONFIRMED);
            this.showCountiesData(NEW_CONFIRMED);
        }
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

    showGlobalData(infoParameter) {
        const globalCases = document.querySelector('.global-cases__volume');
        globalCases.textContent = '';
        globalCases.textContent = this.globalInfo[infoParameter];
    }

    showCountiesData(countryInfoParam) {
        const table = document.querySelector('.countries-cases__content');
        table.innerHTML = '';
        this.countriesInfo.sort((prev, next) => next[countryInfoParam] - prev[countryInfoParam])
            .forEach((country) => {
                this.createCountryInfo(country, countryInfoParam, table);
            });
    }

    changeInfo(isGlobal = true, isReverse = false) {
        let title;
        let parameter;
        if (isGlobal) {
            title = document.querySelector('.slider-global-cases__content');
            parameter = SHOW_GLOBAL_INFO;
        } else {
            title = document.querySelector('.slider-countries-cases__content');
            parameter = SHOW_COUNTRIES_INFO;
        }
        const categoryInfo = title.textContent;
        if (!isReverse) {
            switch (categoryInfo) {
                case GLOBAL_CASES:
                    title.textContent = DEATHS_CASES;
                    if (this.isAllPeriod) {
                        this[parameter](TOTAL_DEATHS);
                    } else {
                        this[parameter](NEW_DEATHS);
                    }
                    break;
                case DEATHS_CASES:
                    title.textContent = RECOVERED_CASES;
                    if (this.isAllPeriod) {
                        this[parameter](TOTAL_RECOVERED);
                    } else {
                        this[parameter](NEW_RECOVERED);
                    }
                    break;
                default:
                    title.textContent = GLOBAL_CASES;
                    if (this.isAllPeriod) {
                        this[parameter](TOTAL_CONFIRMED);
                    } else {
                        this[parameter](NEW_CONFIRMED);
                    }
            }
        } else {
            switch (categoryInfo) {
                case GLOBAL_CASES:
                    title.textContent = RECOVERED_CASES;
                    if (this.isAllPeriod) {
                        this[parameter](TOTAL_RECOVERED);
                    } else {
                        this[parameter](NEW_RECOVERED);
                    }
                    break;
                case DEATHS_CASES:
                    title.textContent = GLOBAL_CASES;
                    if (this.isAllPeriod) {
                        this[parameter](TOTAL_CONFIRMED);
                    } else {
                        this[parameter](NEW_CONFIRMED);
                    }
                    break;
                default:
                    title.textContent = DEATHS_CASES;
                    if (this.isAllPeriod) {
                        this[parameter](TOTAL_DEATHS);
                    } else {
                        this[parameter](NEW_DEATHS);
                    }
                    break;
            }
        }
    }

    createCountryInfo(country, info, table) {
        const countryName = country.Country;
        const countryInfo = String(country[info]);
        const line = create('tr', 'table__line', '', table);
        create('td', 'table__country', countryName, line);
        create('td', '', countryInfo, line);
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
