import { getTokens } from '../DB/tokens/token';
import { sendMail } from '../API/gmail/Gmail';
import { playSong } from '../API/spotify/spotify';
import { discordSendMP } from '../API/Discord/discord';
import { sendTweet } from '../API/twitter/twitter';

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
        case 'MP':
            result = await discordSendMP(inputReaction, "Un message discord");
            break;
        case 'Twitter':
            console.log("Appel de sendTweet imminent");
            result = await sendTweet(token[0].x_token, inputReaction);
            break;
        default:
            break;
    }
    return result;
}
