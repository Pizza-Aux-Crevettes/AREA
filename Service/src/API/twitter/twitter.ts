import { sendPostTwitter } from "./twitter.query";

export async function sendTweet (token:string, tweetText: string) : Promise<any>{
    console.log("Je suis dans sendTweet")
    const result = await sendPostTwitter(token, tweetText);
    if (result === null) {
        console.error('Error when sending the tweet')
        return;
    }
    return result;
}
