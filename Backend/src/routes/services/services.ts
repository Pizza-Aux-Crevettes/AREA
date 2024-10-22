import { Express, Request, Response, Router } from 'express';
import { createService, getService, updateService } from './services.query';

module.exports = (app: Express) => {
    app.post('/api/setNewToken', async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        const service_infos = req.body;
        if (service_infos.token === '') {
            service_infos.token = null;
        }
        const result = await updateService(
            service_infos.userEmail,
            service_infos.token,
            service_infos.service
        );
        if (result === null) {
            res.status(400).json({
                msg: 'Error when setting new token, the email does not exit',
            });
            return;
        }
        res.status(201).json({
            msg: 'The token has been successfully registered',
        });
    });

    app.post('/api/setNewUSer', async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        const service_infos = req.body;
        const result = await createService(service_infos.userEmail);
        if (result === null) {
            res.status(409).json({
                msg: 'Email already exist',
            });
            return;
        }
        res.status(201).json({
            msg: 'The new user has been successfully registered',
        });
    });

    app.post('/api/getToken', async (req: Request, res: Response) => {
        /*
        #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/getToken"
                    }
                }
            }
        }
         */
        res.setHeader('Content-Type', 'application/json');
        const service_infos = req.body;
        const result = await getService(service_infos.user_email);
        if (result === null) {
            res.status(400).json({
                msg: 'Error when get token service, Missing or invalid email',
            });
            return;
        }
        res.status(200).json(result);
    });
};
