import { Express, Request, Response } from 'express';
import { getGmailMsg } from './Gmail.query';

module.exports = (app: Express) => {
    app.post('/api/gmail/msg', async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        const info = req.body;
        const result = await getGmailMsg(info.token);
        if (result === null) {
            res.status(500).json({
                msg: 'Error when fetching user mail',
            });
            return;
        }
        res.status(200).json(result.snippet);
    });
};
