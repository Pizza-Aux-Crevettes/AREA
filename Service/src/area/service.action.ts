import {
    getWeatherDatas,
    getAlertsDatas,
} from '../API/openWeather/openWeather';
import { haveMail } from '../API/gmail/Gmail';
import { getTokens } from '../DB/tokens/token';
import { ifChangeUsername } from '../API/Discord/discord';

export async function setActions(
    action: string,
    inputAction: string,
    email: string
): Promise<any> {
    let result;
    const token = await getTokens(email);
    switch (action) {
        case 'Weather':
            result = await getWeatherDatas(inputAction);
            break;
        case 'Alert':
            result = await getAlertsDatas(inputAction);
            break;
        case 'Email':
            result = await haveMail(email, token[0].google_token);
            break;
        case 'DiscordUsername':
            result = await ifChangeUsername(email);
            break;
        default:
            break;
    }
    return result;
}
