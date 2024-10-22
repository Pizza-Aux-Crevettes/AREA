import { getAllConfigs } from './area.query';

export async function getAreaList(): Promise<any> {
    const result = await getAllConfigs();
    if (result === null) {
        console.error('Error when fetching all areas config');
    }
    return result;
}
