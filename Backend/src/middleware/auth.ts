import { NextFunction, Request, Response } from 'express';
import supabase from '../config/db';
const jwt = require('jsonwebtoken');

async function userHaveAccount(email: string): Promise<boolean> {
    const { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('email', email);
    if (error || data?.length === 0) {
        console.error(error);
        return false;
    } else {
        return true;
    }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send('No token provided');
        return;
    }
    try {
        let token_only = token.toString().split(' ')[1];
        let decoded: any = jwt.decode(token_only, process.env.SECRET);
        if (!(userHaveAccount(decoded.email))) {
            res.status(401).send('Bad Request');
            return;
        }
        next();
        return;
    } catch (e) {
        res.status(401).send('Bad Request');
        return;
    }
}