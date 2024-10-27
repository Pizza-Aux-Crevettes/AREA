import {
    getWeatherDatas,
    getAlertsDatas,
} from '../API/openWeather/openWeather';
import { getNewsDatas } from '../API/news/News';
import { haveMail } from '../API/gmail/Gmail';
import { getTokens } from '../DB/tokens/token';
import {
    ifChangeUsername,
    ifNumberOfGuildsChange,
} from '../API/Discord/discord';
import { IsActive } from '../manageFS/manageFile';

export async function setActions(
    action: string,
    inputAction: string,
    email: string
): Promise<any> {
    let result;
    const token = await getTokens(email);
    switch (action) {
        case 'Weather':
            result = await IsActive(
                './WeatherFile.json',
                inputAction,
                getWeatherDatas,
                email
            );
            break;
        case 'Alert':
            result = await IsActive(
                './AlertFile.json',
                inputAction,
                getAlertsDatas,
                email
            );
            break;
        case 'News':
            result = await getNewsDatas(email, inputAction);
            break;
        case 'Email':
            result = await haveMail(email, token[0].google_token);
            break;
        case 'DiscordUsername':
            result = await ifChangeUsername(token[0].discord_token, email);
            break;
        case 'DiscordGuilds':
            result = await ifNumberOfGuildsChange(
                token[0].discord_token,
                email
            );
            break;
        default:
            break;
    }
    return result;
}
