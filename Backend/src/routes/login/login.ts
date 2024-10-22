import { Express, Request, Response, Router } from 'express';
import { loginUsers, verifyPwd, lowercaseFirstLetter } from './login.query';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

function generateToken(email: string): string {
    return jwt.sign({ email: email }, process.env.SECRET);
}

module.exports = (app: Express) => {
    app.post('/api/login', async (req: Request, res: Response) => {
        /*
        #swagger.responses[200] = {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/login"
                    }
                }
            }
        }
         */
        res.setHeader('Content-Type', 'application/json');
        const user_infos = req.body;
        const result = await loginUsers(lowercaseFirstLetter(user_infos.email));
        if (result === null) {
            res.status(400).json({
                msg: 'Missing email or password',
            });
            return;
        }
        const samePwd = await verifyPwd(
            user_infos.password,
            result[0].password
        );
        if (!samePwd) {
            res.status(401).json({
                msg: 'Incorrect email or password',
            });
            return;
        }
        res.status(200).json({
            own_token: generateToken(user_infos.email),
        });
    });
};
