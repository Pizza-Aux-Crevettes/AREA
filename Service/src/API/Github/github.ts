import { createIssue, createBranch } from "./github.query";

export async function issueGithub(token:string, infos: string) {
    const info = infos.split(' ');
    const result = await createIssue(token, info[0], info[1], info[2])
    if (result !== null) {
        return result;
    }
    console.error('Error during create the issue');
    return false;
}

export async function branchGithub(token: string, infos: string) {
    const info = infos.split(' ');
    const randomInt = Math.floor(Math.random() * 3500) + 1;
    const randomIntToStr = randomInt.toString();
    const result = await createBranch(token, info[0], info[1], info[2] + randomIntToStr)
    if (result !== null) {
        return result;
    }
    console.error('Error during create the branch');
    return false;
}
