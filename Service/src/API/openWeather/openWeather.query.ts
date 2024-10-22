import dotenv from 'dotenv';

dotenv.config();

export async function getWeather(userCity: string): Promise<any> {
    interface cities {
        city: string;
        position: string;
    }

    let Cities: cities[] = [
        { city: 'Paris', position: 'lat=48.85&lon=2.35' },
        { city: 'Marseille', position: 'lat=43.29&lon=5.36' },
        { city: 'Lyon', position: 'lat=45.760&lon=4.83' },
        { city: 'Toulouse', position: 'lat=43.60&lon=1.44' },
        { city: 'Nice', position: 'lat=43.71&lon=7.26' },
        { city: 'Nantes', position: 'lat=47.21&lon=-1.55' },
        { city: 'Montpellier', position: 'lat=43.61&lon=3.87' },
        { city: 'Strasbourg', position: 'lat=48.57&lon=7.75' },
        { city: 'Bordeaux', position: 'lat=44.83&lon=-0.57' },
        { city: 'Lille', position: 'lat=50.62&lon=3.05' },
    ];

    let userPosition = '';

    for (let i = 0; i < Cities.length; i++) {
        if (Cities[i].city === userCity) {
            userPosition = Cities[i].position;
        }
    }

    if (userPosition !== '') {
        const apiKey = process.env.OPENWHEATER_KEY as string;
        const url = `http://api.openweathermap.org/data/2.5/weather?${userPosition}9&appid=${apiKey}&units=metric&lang=fr`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Description: ${data.weather[0].description}`);
            console.log(`Température: ${data.main.temp}°C`);
            console.log(`Humidité: ${data.main.humidity}%`);
            console.log(`Vent: ${data.wind.speed} m/s`);

            let Word;
            for (let i = 0; i <= data.weather.length; i++) {
                Word = data.weather[0].description.split(' ')[i];
                if (Word === 'pluie') {
                    console.log('pluie');
                    return true;
                }
                if (Word === 'bruine') {
                    console.log('pluie');
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des données météo : ',
                error
            );
            return null;
        }
    } else {
        console.error('No data found');
        return null;
    }
}

export async function getAlerts(userCity: string): Promise<any> {
    interface cities {
        city: string;
        position: string;
    }

    let Cities: cities[] = [
        { city: 'Tokyo', position: 'lat=35.67&lon=139.65' },
        { city: 'Jakarta', position: 'lat=-6.20&lon=106.84' },
        { city: 'Manille', position: 'lat=14.59&lon=120.98' },
        { city: 'Port-au-Prince', position: 'lat=18.59&lon=-72.30' },
        { city: 'Mexico City', position: 'lat=19.43&lon=-99.13' },
        { city: 'Los Angeles', position: 'lat=34.05&lon=-118.24' },
        { city: 'Calcutta', position: 'lat=22.57&lon=88.36' },
        { city: 'Dhaka', position: 'lat=23.81&lon=90.41' },
        { city: 'Caracas', position: 'lat=10.48&lon=-66.90' },
        { city: 'Christchurch', position: 'lat=-43.53&lon=172.63' },
    ];

    let userPosition = '';

    for (let i = 0; i < Cities.length; i++) {
        if (Cities[i].city === userCity) {
            userPosition = Cities[i].position;
        }
    }

    if (userPosition !== '') {
        const apiKey = process.env.OPENWHEATER_KEY as string;
        const url = `https://api.openweathermap.org/data/3.0/onecall?${userPosition}&exclude=hourly,daily&appid=${apiKey}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur: ${response.status}`);
            }
            const data = await response.json();
            if (data.alerts) {
                return data.alerts;
            } else {
                return '';
            }
        } catch (error) {
            console.error('fetching data: ', error);
            return null;
        }
    } else {
        console.error('No data found');
        return null;
    }
}
