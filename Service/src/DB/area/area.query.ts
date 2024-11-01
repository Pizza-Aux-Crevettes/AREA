import supabase from '../../config/db';

export async function getAllConfigs(): Promise<any> {
    const { data, error } = await supabase.from('ActReact').select('*');
    if (error) {
        console.error(error);
        return null;
    } else {
        return data;
    }
}
