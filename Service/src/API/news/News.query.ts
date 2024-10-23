import dotenv from "dotenv";
import supabase from "../../config/db";
dotenv.config();

interface Article {
    author: string;
    title: string;
}

function parseArticle(jsonData: string): Article {
    try {
        const parsedData: { articles: Article[] } =  JSON.parse(jsonData);
        if (parsedData.articles && parsedData.articles.length > 0) {
            return parsedData.articles[0];
        } else {
            return {} as Article;
        }
    } catch (error) {
        console.error("Error parsing JSON: ", error);
        return {} as Article;
    }
}

async function registerUserNews(email: string, news_author: string, news_title: string): Promise<any> {

    const { error } = await supabase
        .from('NewsArticle')
        .insert([
            {
                Email: email,
                Author: news_author,
                Title: news_title
            },
        ])
        .select()

    if (error) {
        console.log(error);
        return null;
    } else {
        return true;
    }
}

async function updateUserNews(email: string, user_data: any, news_author: string, news_title: string): Promise<any> {
    if (user_data[0].Author === news_author && user_data[0].Title === news_title) {
        return false;
    } else {
        const {error} = await supabase
            .from('NewsArticle')
            .update([
                {
                    Author: news_author,
                    Title: news_title
                }
            ])
            .eq("Email", email)
            .select()
        if (error) {
            console.log(error);
            return null;
        } else {
            return true;
        }
    }
}

async function getDataUser(email: string): Promise<any> {
    const { data: user_data, error } = await supabase
        .from("NewsArticle")
        .select("*")
        .eq("Email", email);

    if (error) {
        console.log(error);
        return null;
    } else {
        return user_data;
    }
}

export async function getArticle(email: string, title: string): Promise<any> {
    const newsKey: string = process.env.NEWSAPI_API_KEY as string;
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    console.log(formattedDate);
    const urlTranslate =
        `https://newsapi.org/v2/everything?pageSize=1&qInTitle="${title}"&sortBy=publishedAt&apiKey=${newsKey}`;

    try {
        const result = await fetch(urlTranslate);

        const jsonData = await result.text();
        const article = parseArticle(jsonData);
        console.log("email:", email);
        console.log("article Author:", article.author);
        console.log("article Title:", article.title);
        if (article.author !== undefined && article.title !== undefined) {
            const user_data = await getDataUser(email);
            console.log("DB Author:", user_data[0].Author);
            console.log("DB Title:", user_data[0].Title, "End news\n");
            if (user_data.length === 0) {
                const register = await registerUserNews(email, article.author, article.title);
                return register;
            } else {
                const update = await updateUserNews(email, user_data, article.author, article.title);
                return update;
            }
        } else {
            console.log("End news\n");
            return false;
        }
    } catch (error) {
        console.error("error during recovery of articles : ", error);
        return null;
    }
}

