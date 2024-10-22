import supabase from "../../config/db";

export async function setAdaptability(user_email: string): Promise<any> {
    const user_info = await getAdaptability(user_email);
    const newAdaptabilityText = !user_info[0].adaptabilityText;

    const { data: updateResult, error } = await supabase
        .from("User")
        .update({ adaptabilityText: newAdaptabilityText })
        .eq("email", user_email);

    if (error) {
        console.error('Erreur mise à jour utilisateur:', error);
        return null;
    }

    return updateResult;
}


export async function getAdaptability(user_email: string): Promise<any> {
    const { data, error } = await supabase
        .from("User")
        .select("adaptabilityText")
        .eq("email", user_email);
    if (error) {
        console.error(error);
        return null;
    }
    if (data.length === 0) {
        return null;
    }
    return data;
}