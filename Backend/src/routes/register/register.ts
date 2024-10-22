import { Express, Request, Response, Router } from 'express';
import { register } from './register.query';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

module.exports = (app: Express) => {
    app.post('/api/register', async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        const user_infos = req.body;
        if (
            !user_infos.name ||
            !user_infos.surname ||
            !user_infos.username ||
            !user_infos.email ||
            !user_infos.password
        ) {
            res.status(400).json({ msg: 'No field must be empty' });
            return;
        }
        const result = await register(
            user_infos.name,
            user_infos.surname,
            user_infos.username,
            bcrypt.hashSync(user_infos.password, 10),
            user_infos.email
        );
        if (result === null) {
            res.status(409).json({
                msg: 'Email or username already exists',
            });
            return;
        }
        res.status(201).json({ msg: 'Your account has been created' });
    });
};
