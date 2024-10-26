import { createIssue } from "./github.query";

export async function issueGithub(token:string, infos: string) {
    const info = infos.split(' ');
    const result = createIssue(token, info[0], info[1], info[2])
    if (result !== null) {
        return result;
    }
    console.error('Error during create the issue');
    return false;
}
