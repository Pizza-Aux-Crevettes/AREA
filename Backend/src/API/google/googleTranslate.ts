export async function translate(
    text: string,
    sourceLangage: string,
    destinationLangage: string
) {
    const apiKey: string = process.env.GOOGLE_API_KEY as string;
    const urlTranslate = "https://newsapi.org/v2/top-headlines";
    try {
        const result = await fetch(urlTranslate, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + apiKey,
                "x-goog-user-project": "utility-pad-436613-j3",
            },
            body: JSON.stringify({
                q: text,
                source: sourceLangage,
                target: destinationLangage,
            }),
        });

        const data = await result.json();
    } catch (error) {
        console.error("error during translation : ", error);
    }
}
