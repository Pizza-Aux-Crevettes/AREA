import supabase from '../../config/db';

export async function setUserName(
    email: string,
    userName: string,
    nbGuilds: number
) {
    try {
        const { error } = await supabase
            .from('DiscordUserDatas')
            .insert({
                username: userName,
                email: email,
                nbGuilds: nbGuilds,
            })
            .select();
        return true;
    } catch (error) {
        console.error('update Discord Username', error);
        return false;
    }
}
