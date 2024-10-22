import { clipTwitch } from "./twitch.query"

export async function createClipTwitch(username: string, token: string): Promise<any> {
    const result = await clipTwitch(username, token);
    if (result !== null) {
        return result;
    }
    console.error('Streamer is not streaming');
    return false;
}
