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
} from '../../constants/constants'

export default class Dashboard {
    constructor(isAllPeriod) {
        this.globalInfo = null;
        this.countriesInfo = null;
        this.population = null;
        this.isAllPeriod = isAllPeriod
    }

    async run() {
        console.log(this.isAllPeriod)
        await this.getData();
        if(this.isAllPeriod) {
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
        const globalCases = document.querySelector('.global-cases__global-volume');
        globalCases.textContent = '';
        globalCases.textContent = this.globalInfo[infoParameter];
    }

    showCountiesData(countryInfoParam) {
        const table = document.querySelector('.countries-cases__content');
        table.innerHTML = ''
        this.countriesInfo.sort((prev, next) => next[countryInfoParam] - prev[countryInfoParam])
            .forEach((country) => {
                this.createCountryInfo(country, countryInfoParam, table);
            });
        }

    changeGlobalInfo() {
        const title = document.querySelector('.global-cases__title')
        if (title.textContent === GLOBAL_CASES) {
            title.textContent = DEATHS_CASES;
            if (this.isAllPeriod) {
                this.showGlobalData(TOTAL_DEATHS);
            } else {
                this.showGlobalData(NEW_DEATHS);
            }     
        } else if (title.textContent === DEATHS_CASES) {
            title.textContent = RECOVERED_CASES;
            if (this.isAllPeriod) {
                this.showGlobalData(TOTAL_RECOVERED);
            } else {
                this.showGlobalData(NEW_RECOVERED);
            }   
        } else {
            title.textContent = GLOBAL_CASES;
            if (this.isAllPeriod) {
                this.showGlobalData(TOTAL_CONFIRMED);
            } else {
                this.showGlobalData(NEW_CONFIRMED);
            } 
        }
    }

    createCountryInfo(country, info, table) {
        const countryName = country.Country;
        const countryInfo = String(country[info]);
        const countryFlagInfo = this.population.find((countryFind) => countryFind.name === countryName);
        let countryFlagUrl
        const line = create('tr', '', '', table);
        create('td', '', countryName, line);
        create('td', '', countryInfo, line);
        if (countryFlagInfo) {
            countryFlagUrl = countryFlagInfo.flag;
            create('img', 'country__flag', '', line, ['src', countryFlagUrl], ['alt', 'flag']);
        }
        
    }

}


