import {
    COUNTRIES_INFO_URL,
    FEATURE_COLLECTION,
    FEATURE,
    POINT
} from '../../constants/constants';

export default class Map {
    create() {
        const mapOptions = {
            center: [17.385044, 78.486671],
            zoom: 4
        };

        const map = new L.map('map', mapOptions);
        const layer = new L.TileLayer('https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png');

        async function mapEffect({ leafletElement: map } = {}) {
            let response;

            try {
                response = await axios.get(COUNTRIES_INFO_URL);
            } catch (e) {
                console.log(`Failed to fetch countries: ${e.message}`, e);
                return;
            }
            const { data = [] } = response;
            const hasData = Array.isArray(data) && data.length > 0;

            if (!hasData) return;

            const geoJson = {
                type: FEATURE_COLLECTION,
                features: data.map((country = {}) => {
                    const { countryInfo = {} } = country;
                    const { lat, long: lng } = countryInfo;
                    return {
                        type: FEATURE,
                        properties: {
                            ...country
                        },
                        geometry: {
                            type: POINT,
                            coordinates: [lng, lat]
                        }
                    };
                })
            };
        }

        map.addLayer(layer);
    }
}
