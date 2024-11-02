import supabase from '../../config/db';

export async function delMailUser(email: string): Promise<void> {
    try {
        const { error } = await supabase
            .from('LastUserEmail')
            .delete()
            .eq('userEmail', email);
    } catch (error) {
        console.error('Delete Discord username : ', error);
    }
}
