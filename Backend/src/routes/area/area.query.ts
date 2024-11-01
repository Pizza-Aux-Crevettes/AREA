import supabase from '../../config/db';

export async function setNewArea(
    user_email: string,
    action: string,
    reaction: string,
    inputAct: string,
    inputReact: string
): Promise<any> {
    const { data, error } = await supabase
        .from('ActReact')
        .insert([
            {
                userEmail: user_email,
                action: action,
                reaction: reaction,
                inputAction: inputAct,
                inputReaction: inputReact,
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

export async function delArea(email: string, body: any): Promise<any> {
    if (body.inputReact) {
        const { data, error } = await supabase.from('ActReact').delete().match({
            userEmail: email,
            action: body.action,
            reaction: body.reaction,
            inputAction: body.inputAct,
            inputReaction: body.inputReact,
        });
        if (error) {
            console.error(error);
            return null;
        } else {
            return true;
        }
    } else {
        const { data, error } = await supabase.from('ActReact').delete().match({
            userEmail: email,
            action: body.action,
            reaction: body.reaction,
            inputAction: body.inputAct,
        });
        if (error) {
            console.error(error);
            return null;
        } else {
            return true;
        }
    }
}

export async function getArea(user_email: string): Promise<any> {
    const { data, error } = await supabase
        .from('ActReact')
        .select('*')
        .eq('userEmail', user_email);
    if (error) {
        console.error(error);
        return null;
    } else {
        return data;
    }
}
