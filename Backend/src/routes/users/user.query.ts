import supabase from "../../config/db";

export async function setAdaptability(user_email: string, needAdaptability: boolean): Promise<any> {
    const { data: user_info, error } = await supabase
        .from("User")
        .insert({adaptabilityText: needAdaptability})
        .eq("email", user_email);
    if (error) {
        console.error(error);
        return null;
    }
    return user_info;
}

export async function getAdaptability(user_email: string): Promise<any> {
    const { data: user_info, error } = await supabase
        .from("User")
        .select("adaptabilityText")
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