import { Express, Request, Response, Router } from 'express';
import { setNewArea, delArea, getArea } from './area.query';
const jwt = require('jsonwebtoken');

module.exports = (app: Express) => {
    app.post('/api/setArea', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const area = req.body;
        console.log(req.body);
        const email: any = jwt.verify(area.token, process.env.SECRET);
        const result = await setNewArea(
            email.email,
            area.action,
            area.reaction,
            area.inputAct,
            area.inputReact
        );
        if (result === null) {
            res.status(400).json({
                msg: 'Error when creating a new area',
            });
            return;
        }
        res.status(201).json({ msg: 'area was successfully created' });
    });

    app.post('/api/delArea', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const area = req.body;
        const email: any = jwt.verify(area.token, process.env.SECRET);
        const result = await delArea(email.email, area);
        if (result === null) {
            res.status(400).json({
                msg: 'Error when creating a new area',
            });
            return;
        }
        res.status(201).json({ msg: 'area was successfully deleted' });
    });

    app.post('/api/getArea', async (req, res) => {
        /*
        #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/getArea"
                    }
                }
            }
        }
         */
        res.setHeader('Content-Type', 'application/json');
        const area = req.body;
        const token: any = jwt.verify(area.token, process.env.SECRET);
        const result = await getArea(token.email);
        if (result === null) {
            res.status(400).json({
                msg: 'Error when creating a new area',
            });
            return;
        }
        res.status(200).json(result);
    });
};
