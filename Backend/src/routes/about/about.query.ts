import supabase from '../../config/db';

export async function getAreaList(): Promise<any> {
    const { data, error } = await supabase.from('AboutArea').select('*');
    if (error) {
        throw error;
    } else {
        return data;
    }
}
