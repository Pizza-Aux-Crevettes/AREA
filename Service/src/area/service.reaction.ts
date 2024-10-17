import { getTokens } from '../DB/tokens/token';
import { sendMail } from '../API/gmail/Gmail';
import { playSong } from '../API/spotify/spotify';
import { discordSendMP } from '../API/Discord/discord';

export async function setReaction(
    reaction: string,
    inputReaction: string,
    email: string
): Promise<void> {
    let result;
    const token = await getTokens(email);
    switch (reaction) {
        case 'Spotify':
            console.log(token[0].spotify_token)
            result = await playSong(email, token[0].spotify_token);
            break;
        case 'sendEmail':
            result = await sendMail(email, token[0].google_token, inputReaction);
            break;
        case 'MP':
            result = await discordSendMP(inputReaction, "Un message discord");
            break;
        default:
            break;
    }
    return result;
}
