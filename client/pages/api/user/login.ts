import cookie from 'cookie';
import {sign} from 'jsonwebtoken';
import {NextApiRequest, NextApiResponse} from 'next';
import axios from "axios";
export default async function login(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const resp = await axios.post(`${process.env.API_URL}/user/login`, req.body)
        const user = resp.data?.db_user
        if (!user) {
            return res.status(400).json(resp.data)
        }
        res.setHeader('Set-Cookie', cookie.serialize('auth', resp.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 3600,
            path: '/'
        }))
        res.json({user, token: resp.data.token});
    } else {
        res.status(405).json({message: 'We only support POST'});
    }
}
