import { Express, Request, Response, Router } from 'express';
import { auth } from '../../middleware/auth';
import { getAreaList } from './about.query';

module.exports = (app: Express) => {
    app.get('/about.json', auth, async (req: Request, res: Response) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const clientIp = req.ip || req.headers['x-forwarded-for'];

        const result = await getAreaList();
        if (result === null) {
            res.status(401).json({ msg: 'Error when getting area list' });
            return;
        }

        const transformed = result.reduce(
            (acc: any, item: any) => {
                if (!acc[item.service]) {
                    acc[item.service] = {
                        name: item.service,
                        actions: [],
                        reactions: [],
                    };
                }

                if (item.action) {
                    acc[item.service].actions.push({
                        name: item.name,
                        description: item.description,
                    });
                }
                if (item.reaction) {
                    acc[item.service].reactions.push({
                        name: item.name,
                        description: item.description,
                    });
                }

                return acc;
            },
            {} as Record<
                string,
                {
                    name: string;
                    actions: { name: string; description: string }[];
                    reactions: { name: string; description: string }[];
                }
            >
        );

        const formattedResult = Object.values(transformed);

        const response = {
            client: {
                host: clientIp,
            },
            server: {
                current_time: currentTime,
                services: formattedResult,
            },
        };
        res.status(200).json(response);
    });
};
