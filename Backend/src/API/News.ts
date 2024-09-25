import dotenv from "dotenv";
dotenv.config();

export async function newsApi() {
    const newsKey: string = process.env.NEWSAPI_API_KEY as string;
    const urlTranslate =
        "https://newsapi.org/v2/everything?q=keyword&apiKey=19e9ec6ad01243d080bcbbeb75aad4f7";
    try {
        const result = await fetch(urlTranslate);

        const data = await result.json();
        console.log(data.articles);
    } catch (error) {
        console.error("error during translation : ", error);
    }
}
