import dotenv from 'dotenv';

dotenv.config();

export async function sendTweet(token: string, tweetText: string) {
    const tweetData = {
        text: tweetText
    };

    try {
        const res = await fetch(
            'https://api.twitter.com/2/tweets',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tweetData),
            }
        );

        if (!res.ok) {
            const errorInfo = await res.json();
            console.error('Error :', errorInfo);
            return null;
        }

        const result = await res.json();
        console.log('Tweet posted', result);
        return result;
    } catch (error) {
        console.error('Error when sending the tweet:', error);
        return null;
    }
}