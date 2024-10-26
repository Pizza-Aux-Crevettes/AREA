import axios from 'axios';

export async function createIssue(accessToken: string, repoOwner: string, repoName: string, title: string) {
    const response = await axios.post(
        `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
        {
            title: title
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github.v3+json',
            }
        }
    );
    return response.data;
}
