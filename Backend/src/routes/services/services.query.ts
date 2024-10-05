import supabase from "../../config/db";
import bcrypt from "bcryptjs";

export async function createService(
    user_email: string,
    token_spotify: string
): Promise<any> {
    const { data, error } = await supabase
        .from("Service")
        .insert([
            {
                user_email: user_email,
                token_spotify: token_spotify,
            },
        ])
        .select();
    if (error) {
        console.log(error);
        return null;
    } else {
        return data;
    }
}

export async function getService(user_email: string): Promise<any> {
    const { data: user_info, error } = await supabase
        .from("Services")
        .select("token_spotify")
        .eq("email", user_email);
    if (error) {
        console.error(error);
        return null;
    }
    if (user_info.length === 0) {
        return null;
    }
    return user_info;
}
