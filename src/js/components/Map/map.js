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
                response = await axios.get('https://corona.lmao.ninja/v2/countries');
            } catch (e) {
                console.log(`Failed to fetch countries: ${e.message}`, e);
                return;
            }
            const { data = [] } = response;
            const hasData = Array.isArray(data) && data.length > 0;

            if (!hasData) return;

            const geoJson = {
                type: 'FeatureCollection',
                features: data.map((country = {}) => {
                    const { countryInfo = {} } = country;
                    const { lat, long: lng } = countryInfo;
                    return {
                        type: 'Feature',
                        properties: {
                            ...country
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [lng, lat]
                        }
                    };
                })
            };
        }

        map.addLayer(layer);
    }
}
