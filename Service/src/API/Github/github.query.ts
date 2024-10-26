import axios from 'axios';

export async function createIssue(token: string, repoOwner: string, repoName: string, title: string) {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title
        })
    });

    const data = await response.json();
    return data;
}

export async function createBranch(token: string, repoOwner: string, repoName: string, branchName: string) {
    const branchInfoResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/refs/heads/main`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json'
        }
    });

    const branchInfo = await branchInfoResponse.json();
    const commitSha = branchInfo.object.sha;

    const newBranchResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/git/refs`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ref: `refs/heads/${branchName}`,
            sha: commitSha
        })
    });

    const newBranchData = await newBranchResponse.json();
    return newBranchData;
}
