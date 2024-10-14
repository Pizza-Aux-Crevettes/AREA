import { Express, Request, Response, Router } from 'express';
import { createService, getService, updateService } from './services.query';

module.exports = (app: Express) => {
    /**
     * @swagger
     * /api/setNewToken:
     *   post:
     *     summary: update the tokens of service connexion in service table
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               userEmail:
     *                 type: string
     *               token_spotify:
     *                 type: string
     *     responses:
     *       201:
     *         description: the new token has been set
     *       400:
     *         description: Bad Request - Missing or invalid email
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Error when setting new token, the email does not exit"
     */
    app.post('/api/setNewToken', async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        const service_infos = req.body;
        console.log(req.body);
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
        res.status(201).json(result);
    });

    /**
     * @swagger
     * /api/setNewUSer:
     *   post:
     *     summary: set a new user in service table
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               userEmail:
     *                 type: string
     *     responses:
     *       201:
     *         description: the new user service has been created
     *       409:
     *         description: Conflict - Email already exists
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Email already exists"
     */

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
        res.status(201).json(result);
    });

    /**
     * @swagger
     * /api/getToken:
     *   post:
     *     summary: Get token for a specified user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               user_email:
     *                 type: string
     *     responses:
     *       200:
     *         description: get the list of token for the specified user
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   user_email:
     *                     type: string
     *       400:
     *         description: Bad Request - Missing or invalid email
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Missing email"
     */

    app.post('/api/getToken', async (req: Request, res: Response) => {
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
