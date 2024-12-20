import { getTokens } from '../DB/tokens/token';
import { sendMail, createCalEvent } from '../API/gmail/Gmail';
import { playSong } from '../API/spotify/spotify';
import { discordSendMP } from '../API/Discord/discord';
import { createClipTwitch } from '../API/twitch/twitch';
import { branchGithub, issueGithub } from '../API/Github/github';

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
        case 'Clip':
            result = await createClipTwitch(inputReaction, token[0].twitch_token, email);
            break;
        case 'Event':
            result = await createCalEvent(token[0].google_token, email, inputReaction);
        case 'MP':
            result = await discordSendMP(inputReaction);
            break;
        case 'Issue':
            result = await issueGithub(token[0].github_token, inputReaction);
            break;
        case 'Branch':
            result = await branchGithub(token[0].github_token, inputReaction);
            break;
        default:
            break;
    }
    return result;
}
