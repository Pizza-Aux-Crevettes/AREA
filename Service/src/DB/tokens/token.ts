import { getTokensConnections } from './token.query';

export async function getTokens(email: string): Promise<any> {
    const result = await getTokensConnections(email);
    if (result === null) {
        console.error('No Tokens Found');
    }
    return result;
}
