import { getWeather, getAlerts } from './openWeather.query';

export async function getWeatherDatas(city: string): Promise<any> {
    const result = await getWeather(city);
    if (result !== null) {
        return result;
    }
    console.error('No data found for weather');
    return false;
}

export async function getAlertsDatas(city: string): Promise<any> {
    const result = await getAlerts(city);
    if (result !== null) {
        return result;
    }
    console.error('No data found for weather alerts');
    return false;
}
