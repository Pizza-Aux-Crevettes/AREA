import supabase from "../../config/db";

export async function createUsers(
    user_name: string,
    user_surname: string,
    user_username: string,
    user_pwd: string,
    user_email: string
): Promise<any> {
    const { data, error } = await supabase
        .from("User")
        .insert([
            {
                name: user_name,
                surname: user_surname,
                username: user_username,
                password: user_pwd,
                email: user_email,
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
