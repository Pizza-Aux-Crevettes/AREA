import supabase from "../../config/db";
import bcrypt from "bcryptjs";

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

export async function loginUsers(user_email: string): Promise<any> {
    const { data: user_info, error } = await supabase
        .from("User")
        .select("password, email")
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

export function lowercaseFirstLetter(str: string): string {
    if (!str) return "";
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export async function verifyPwd(pwd: string, hashedPwd: string): Promise<any> {
    const samePwd = await bcrypt.compare(pwd, hashedPwd);
    if (samePwd) {
        return true;
    } else {
        console.log("bad password");
        return false;
    }
}
