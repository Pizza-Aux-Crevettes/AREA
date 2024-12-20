import { Express, Request, Response } from 'express';
import { setAdaptability, getAdaptability } from './user.query';
import { auth } from '../../middleware/auth';
const jwt = require('jsonwebtoken');

module.exports = (app: Express) => {
    app.get('/api/user/me', auth, async (req: Request, res: Response) => {
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
        if (token) {
            let webToken = token.toString().split(' ')[1];
            try {
                const decoded: any = jwt.verify(webToken, process.env.SECRET);
                res.status(200).json({ email: decoded.email });
            } catch (error) {
                console.error('JWT verification failed :', error);
                res.status(401).json({ msg: 'Invalid or expired token' });
            }
        }
    });

    app.post(
        '/api/setAdaptabilityUser',
        auth,
        async (req: Request, res: Response) => {
            let decoded: any;
            res.setHeader('Content-Type', 'application/json');
            const userInfo = req.body;
            try {
                decoded = jwt.verify(userInfo.token, process.env.SECRET);
            } catch (error) {
                console.error('JWT verification failed:', error);
                res.status(401).json({ msg: 'Invalid or expired token' });
                return;
            }
            const result = setAdaptability(decoded.email);
            if (!result) {
                res.status(400).json({ msg: 'Invalid email' });
                return;
            }
            res.status(200).json({ msg: 'The adaptibily is set' });
        }
    );

    app.get(
        /*
        #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/getAdaptabilityUser"
                    }
                }
            }
        }
         */
        '/api/getAdaptabilityUser',
        auth,
        async (req: Request, res: Response) => {
            let decoded: any;
            res.setHeader('Content-Type', 'application/json');
            const userInfo = req.header('Authorization');
            if (userInfo) {
                try {
                    let token = userInfo.toString().split(' ')[1];
                    decoded = jwt.verify(token, process.env.SECRET);
                } catch (error) {
                    console.error('JWT verification failed:', error);
                    res.status(401).json({ msg: 'Invalid or expired token' });
                    return;
                }
                const result = await getAdaptability(decoded.email);
                if (!result) {
                    res.status(400).json({ msg: 'Invalid email' });
                    return;
                }
                res.status(200).json(result);
            }
        }
    );
};
