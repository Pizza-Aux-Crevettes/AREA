import dotenv from "dotenv";

dotenv.config();

export async function getGmailMe(token: string) {
    let data;
    try {
        const result = await fetch("https://gmail.googleapis.com/me", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });

        data = await result.json();
        console.log(data);
    } catch (error) {
        console.error("error", error);
        return null;
    }
    return data;
}
