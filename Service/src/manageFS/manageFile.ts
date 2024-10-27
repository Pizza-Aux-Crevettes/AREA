import { promises as fsPromises } from 'fs';
import fs from 'fs';

export async function manageFile(
    fileName: string,
    fileContent: boolean,
    email: string
): Promise<any> {
    const file = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    if (!file[`status-${email}`]) file[`status-${email}`] = {};
    file[`status-${email}`].status = fileContent;
    await fsPromises.writeFile(fileName, JSON.stringify(file));
}

export async function IsActive(
    pathFile: string,
    inputAction: string,
    weatherFunc: (userCity: string) => Promise<boolean>,
    email: string
) {
    const result = await weatherFunc(inputAction);
    if (fs.existsSync(pathFile)) {
        const res = fs.readFileSync(pathFile).toString();
        let jsonResult = JSON.parse(res);
        if (jsonResult[`status-${email}`]) {
            if (result === jsonResult[`status-${email}`].status) {
                return false;
            }
            await manageFile(pathFile, result, email);
            return result;
        }
    }
    await manageFile(pathFile, result, email);
    return result;
}
