import dotenv from "dotenv";

dotenv.config();

export async function sendDM(userId: string, message: string, discordClient: any): Promise<void> {
    try {
        const user = await discordClient.users.fetch(userId);
        await user.send(message);
    } catch (error) {
        throw new Error('cannot send the message');
    }
}
