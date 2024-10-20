import { Express, Request, Response } from 'express';
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
};
