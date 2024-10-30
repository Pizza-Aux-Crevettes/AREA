import { createIssue, createBranch } from "./github.query";

export async function issueGithub(token:string, infos: string) {
    const spaceIndex = infos.indexOf(' ');
    const secondSpaceIndex = infos.indexOf(' ', spaceIndex + 1);
    const owner = infos.substring(0, spaceIndex);
    const repName = infos.substring(spaceIndex + 1, secondSpaceIndex);
    const title = infos.substring(secondSpaceIndex + 1);
    const result = await createIssue(token, owner, repName, title)
    if (result !== null) {
        return result;
    }
    console.error('Error during create the issue');
    return false;
}

export async function branchGithub(token: string, infos: string) {
    const spaceIndex = infos.indexOf(' ');
    const secondSpaceIndex = infos.indexOf(' ', spaceIndex + 1);
    const owner = infos.substring(0, spaceIndex);
    const repName = infos.substring(spaceIndex + 1, secondSpaceIndex);
    const title = infos.substring(secondSpaceIndex + 1);
    const randomInt = Math.floor(Math.random() * 3500) + 1;
    const randomIntToStr = randomInt.toString();
    const result = await createBranch(token, owner, repName, title + randomIntToStr)
    if (result !== null) {
        return result;
    }
    console.error('Error during create the branch');
    return false;
}
