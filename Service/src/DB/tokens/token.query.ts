import supabase from '../../config/db';

export async function getTokensConnections(email: string): Promise<any> {
    const { data, error } = await supabase
        .from('Service')
        .select('*')
        .eq('user_email', email);
    if (error) {
        console.error('Error when getting connexions tokens :', error);
        return null;
    } else {
        return data;
    }
}
