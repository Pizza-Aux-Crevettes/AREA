import { sendPostTwitter, sendDM } from "./twitter.query";

export async function sendTweet (token:string, tweetText: string) : Promise<any>{
    console.log(tweetText)
    const result = await sendPostTwitter(token, tweetText);
    if (result === null) {
        console.error('Error when sending the tweet')
        return;
    }
    return result;
}

export async function xSendMP(token: string, dmId: string, dmContent: string) : Promise<any>{
    const result = await sendDM(token, dmId, dmContent);
    if (result === null) {
        console.error('Error when sending the dm')
        return;
    }
    return result;
}
