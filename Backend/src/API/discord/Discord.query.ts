import supabase from '../../config/db';

export async function setUserName(email: string, userName: string) {
    try {
        const { error } = await supabase
            .from('DiscordUserDatas')
            .insert({
                username: userName,
                email: email,
            })
            .select();
        return true;
    } catch (error) {
        console.error('update Discord Username', error);
        return false;
    }
}
