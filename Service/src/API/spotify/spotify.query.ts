import supabase from '../../config/db';

export async function getRefreshSpotifyToken(email: string): Promise<any> {
    try {
        const { data, error } = await supabase
            .from('Service')
            .select('spotify_refresh')
            .eq('user_email', email);
        if (error) {
            return '';
        }
        return data[0].spotify_refresh;
    } catch (e) {
        console.error('Error when getting spotify refresh token in db :', e);
        return '';
    }
}

export async function updateSpotifyToken(
    email: string,
    access_token: string
): Promise<boolean> {
    try {
        const { data, error } = await supabase
            .from('Service')
            .update({
                spotify_token: access_token,
            })
            .eq('user_email', email)
            .select();
        return !error;
    } catch (error) {
        console.error('Error when updating spotify token in db :', error);
        return false;
    }
}
