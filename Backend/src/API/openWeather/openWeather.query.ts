import dotenv from "dotenv";

dotenv.config();

export async function getWeather(userCity: string): Promise<any> {
    interface cities {
        city: string;
        position: string;
    }

    let Cities: cities[] = [
        { city: "Paris", position: "lat=48.85&lon=2.35" },
        { city: "Marseille", position: "lat=43.29&lon=5.36" },
        { city: "Lyon", position: "lat=45.760&lon=4.83" },
        { city: "Toulouse", position: "lat=43.60&lon=1.44" },
        { city: "Nice", position: "lat=43.71&lon=7.26" },
        { city: "Nantes", position: "lat=47.21&lon=-1.55" },
        { city: "Montpellier", position: "lat=43.61&lon=3.87" },
        { city: "Strasbourg", position: "lat=48.57&lon=7.75" },
        { city: "Bordeaux", position: "lat=44.83&lon=-0.57" },
        { city: "Lille", position: "lat=50.62&lon=3.05" },
    ];

    let userPosition = "";

    for (let i = 0; i < Cities.length; i++) {
        if (Cities[i].city === userCity) {
            userPosition = Cities[i].position;
        }
    }

    if (userPosition !== "") {
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
                Word = data.weather[0].description.split(" ")[i];
                if (Word === "pluie") {
                    console.log("pluie");
                    return true;
                }
                if (Word === "bruine") {
                    console.log("pluie");
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des données météo : ",
                error
            );
        }
    } else {
        console.error("No data found");
    }
}

export async function getAlerts(): Promise<any> {
    const apiKey = process.env.OPENWHEATER_KEY as string;
    const url = `https://api.openweathermap.org/alerts/1.0?location={"type":"Polygon","coordinates":[[[109.072266,-9.62148],[108.896484,-44.787594],[157.060547,-44.787594],[157.763672,-9.62148],[109.072266,-9.62148]]]}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error(
            "fetching data: ",
            error
        );
    }
}
