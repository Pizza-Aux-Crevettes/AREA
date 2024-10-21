import { Express, Request, Response } from 'express';
import { setAdaptability, getAdaptability } from './user.query';
const jwt = require('jsonwebtoken');

module.exports = (app: Express) => {
    app.get('/api/user/me', async (req: Request, res: Response) => {
        /*
        #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userMe"
                    }
                }
            }
        }
         */
        const token = req.header('Authorization');
        res.header('Response-Type', 'application/json');
        if (!token) {
            res.status(401).json();
            return;
        } else {
            let webToken = token.toString().split(' ')[1];
            try {
                const decoded: any = jwt.verify(webToken, process.env.SECRET);
                res.status(200).json({ email: decoded.email });
            } catch (error) {
                console.error('JWT verification failed:', error);
                res.status(401).json({ msg: 'Invalid or expired token' });
            }
        }
    });

    app.post('/api/setAdaptabilityUser', async (req: Request, res: Response) => {
        let decoded : any;
        res.setHeader('Content-Type', 'application/json');
        const userInfo = req.body;
        if (!userInfo.token) {
            res.status(401).json();
            return;
        } else {
            let webToken = userInfo.token.toString().split(' ')[1];
            try {
                decoded = jwt.verify(webToken, process.env.SECRET);
            } catch (error) {
                console.error('JWT verification failed:', error);
                res.status(401).json({ msg: 'Invalid or expired token' });
            }
            const result = setAdaptability(decoded.email, userInfo.needAdaptability);
            if (!result) {
                res.status(400).json({ msg: 'invalid email' });
            }
            res.status(200).json({ msg: 'the adadptibily is set' });
        }
    });

    app.get('/api/getAdaptabilityUser', async (req: Request, res: Response) => {
        let decoded : any;
        res.setHeader('Content-Type', 'application/json');
        const userInfo = req.body;
        if (!userInfo.token) {
            res.status(401).json();
            return;
        } else {
            let webToken = userInfo.token.toString().split(' ')[1];
            try {
                decoded = jwt.verify(webToken, process.env.SECRET);
            } catch (error) {
                console.error('JWT verification failed:', error);
                res.status(401).json({ msg: 'Invalid or expired token' });
            }
            const result = getAdaptability(decoded.email);
            if (!result) {
                res.status(400).json({ msg: 'invalid email' });
            }
            res.status(200).json(result);
        }
    });
};
