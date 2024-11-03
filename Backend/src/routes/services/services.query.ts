import supabase from '../../config/db';
import bcrypt from 'bcryptjs';

export async function createService(user_email: string): Promise<any> {
    const { data, error } = await supabase
        .from('Service')
        .insert([
            {
                user_email: user_email,
            },
        ])
        .select();
    if (error) {
        console.error(error);
        return null;
    } else {
        return data;
    }
}

export async function updateService(
    user_email: string,
    token: string,
    service: string
): Promise<any> {
    const { data, error } = await supabase
        .from('Service')
        .update([
            {
                [service]: token,
            },
        ])
        .eq('user_email', user_email)
        .select();
    if (data === null || data.length === 0) {
        console.error(error);
        return null;
    } else {
        return data;
    }
}

export async function getService(user_email: string): Promise<any> {
    const { data: user_info, error } = await supabase
        .from('Service')
        .select('*')
        .eq('user_email', user_email);
    if (error) {
        return null;
    }
    if (user_info.length === 0) {
        return null;
    }
    return user_info;
}
