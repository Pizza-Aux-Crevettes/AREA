import { setActions } from '../area/service.action';
import { getAreaList } from '../DB/area/area';
import { setReaction } from './service.reaction';

export async function manageArea(): Promise<void> {
    const configs = await getAreaList();
    if (configs !== null) {
        for (const config of configs) {
            const result = await setActions(
                config.action,
                config.inputAction,
                config.userEmail,
                config.id
            );
            if (result && result !== '') {
                await setReaction(
                    config.reaction,
                    config.inputReaction,
                    config.userEmail
                );
            }
        }
    }
}
