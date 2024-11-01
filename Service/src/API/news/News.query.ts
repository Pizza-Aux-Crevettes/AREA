import dotenv from 'dotenv';
import supabase from '../../config/db';
dotenv.config();

interface Article {
    author: string;
    title: string;
}

function parseArticle(jsonData: string): Article {
    try {
        const parsedData: { articles: Article[] } = JSON.parse(jsonData);
        if (parsedData.articles && parsedData.articles.length > 0) {
            return parsedData.articles[0];
        } else {
            return {} as Article;
        }
    } catch (error) {
        console.error('Error parsing JSON: ', error);
        return {} as Article;
    }
}

async function registerUserNews(
    email: string,
    news_author: string,
    news_title: string
): Promise<any> {
    const { error } = await supabase
        .from('NewsArticle')
        .insert([
            {
                Email: email,
                Author: news_author,
                Title: news_title,
            },
        ])
        .select();

    if (error) {
        console.error(error);
        return null;
    } else {
        return true;
    }
}

async function updateUserNews(
    email: string,
    user_data: any,
    news_author: string,
    news_title: string
): Promise<any> {
    if (
        user_data[0].Author === news_author &&
        user_data[0].Title === news_title
    ) {
        return false;
    } else {
        const { error } = await supabase
            .from('NewsArticle')
            .update([
                {
                    Author: news_author,
                    Title: news_title,
                },
            ])
            .eq('Email', email)
            .select();
        if (error) {
            console.error(error);
            return null;
        } else {
            return true;
        }
    }
}

async function getDataUser(email: string): Promise<any> {
    const { data: user_data, error } = await supabase
        .from('NewsArticle')
        .select('*')
        .eq('Email', email);

    if (error) {
        console.error(error);
        return null;
    } else {
        return user_data;
    }
}

export async function getArticle(
    email: string,
    title: string,
    id: string
): Promise<any> {
    const newsKey: string = process.env.NEWSAPI_API_KEY as string;
    const urlTranslate = `https://newsapi.org/v2/everything?pageSize=1&qInTitle="${title}"&sortBy=publishedAt&apiKey=${newsKey}`;

    try {
        const result = await fetch(urlTranslate);

        const jsonData = await result.text();
        const article = parseArticle(jsonData);
        if (article.author !== undefined && article.title !== undefined) {
            const newEmail = `${email}-${id}`;
            const user_data = await getDataUser(newEmail);
            if (user_data.length === 0) {
                const register = await registerUserNews(
                    newEmail,
                    article.author,
                    article.title
                );
                return register;
            } else {
                const update = await updateUserNews(
                    newEmail,
                    user_data,
                    article.author,
                    article.title
                );
                return update;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error during recovery of articles :', error);
        return null;
    }
}
