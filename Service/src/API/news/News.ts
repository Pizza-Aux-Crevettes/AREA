import dotenv from 'dotenv';
import { getArticle } from './News.query';
dotenv.config();

export async function getNewsDatas(
    email: string,
    title: string,
    id: string
): Promise<any> {
    const result = await getArticle(email, title, id);
    if (result !== null) {
        return result;
    }
    console.error('No data found for news');
    return false;
}
