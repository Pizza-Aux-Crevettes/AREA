export async function playSong(token: string): Promise<boolean> {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/me/player/play`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    uris: [`spotify:track:5Qnrgqy1pAm9GyNQOgyVFz`],
                }),
            }
        );
        return response.status === 204;
    } catch (e) {
        console.error(e);
        return false;
    }
}
