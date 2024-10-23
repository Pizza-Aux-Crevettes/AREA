import { getTokens } from '../DB/tokens/token';
import { sendMail, createCalEvent } from '../API/gmail/Gmail';
import { playSong } from '../API/spotify/spotify';
import { discordSendMP } from '../API/Discord/discord';
import { createClipTwitch } from '../API/twitch/twitch';

export async function setReaction(
    reaction: string,
    inputReaction: string,
    email: string
): Promise<void> {
    let result;
    const token = await getTokens(email);
    switch (reaction) {
        case 'Spotify':
            result = await playSong(email, token[0].spotify_token);
            break;
        case 'sendEmail':
            result = await sendMail(email, token[0].google_token, inputReaction);
            break;
        case 'MP':
            result = await discordSendMP(inputReaction, "Un message discord");
            break;
        case 'Clip':
            result = await createClipTwitch(inputReaction, token[0].twitch_token);
            break;
        case 'Event':
            result = await createCalEvent(token[0].google_token, email, inputReaction);
        case 'MP':
            result = await discordSendMP(inputReaction, "__(°)< Pouet");
            break;
        default:
            break;
    }
    return result;
}
