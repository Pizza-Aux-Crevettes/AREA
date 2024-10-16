import { getTokens } from '../DB/tokens/token';
import { sendMail } from '../API/gmail/Gmail';
import { playSong } from '../API/spotify/spotify';

export async function setReaction(
    reaction: string,
    inputReaction: string,
    email: string
): Promise<void> {
    let result;
    const token = await getTokens(email);
    switch (reaction) {
        case 'Spotify':
            result = await playSong(token[0].spotify_token);
            break;
        case 'sendEmail':
            result = await sendMail(token[0].google_token, inputReaction);
            break;
        default:
            break;
    }
    return result;
}
