import dotenv from "dotenv";
dotenv.config();

export async function newsApi() {
    const newsKey: string = process.env.NEWSAPI_API_KEY as string;
    const urlTranslate =
        `https://newsapi.org/v2/everything?q=keyword&apiKey=${newsKey}`;
    try {
        const result = await fetch(urlTranslate);

        const data = await result.json();
        console.log(data.articles);
    } catch (error) {
        console.error("error during translation : ", error);
    }
}
