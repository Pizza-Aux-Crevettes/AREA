import {
    getWeatherDatas,
    getAlertsDatas,
} from '../API/openWeather/openWeather';
import { haveMail } from '../API/gmail/Gmail';
import { getTokens } from '../DB/tokens/token';

export async function setActions(
    action: string,
    inputAction: string,
    email: string
): Promise<any> {
    let result;
    switch (action) {
        case 'Weather':
            result = await getWeatherDatas(inputAction);
            break;
        case 'Alert':
            result = await getAlertsDatas(inputAction);
            break;
        case 'Email':
            const token = await getTokens(email);
            result = await haveMail(email, token[0].google_token);
            break;
        default:
            break;
    }
    return result;
}
