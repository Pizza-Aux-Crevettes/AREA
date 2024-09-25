import dotenv from 'dotenv';

dotenv.config();

export async function getWeather() {
    const apiKey= '05bb45c7c82501ed6d87ec923cd90257';
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}&units=metric&lang=fr`;

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
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo : ", error);
    }
}
