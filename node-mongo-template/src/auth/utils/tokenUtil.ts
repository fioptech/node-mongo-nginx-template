import { Request } from "express";
import { sign, verify } from "jsonwebtoken";
import { IUser } from "../models/User";


const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRE = process.env.JWT_EXPIRE as any

export interface AccessTokenData {
    type: 'admin' | 'user',
    id: string,
    createdAt: Date
}

const createAccessToken = (user: IUser): string => {
    let accessTokenData: AccessTokenData = { type: user.type, id: user._id, createdAt: new Date() };
    return sign(accessTokenData, JWT_SECRET, { expiresIn: JWT_EXPIRE })
}

const getTokenFromReq = (req: Request): string => {
    return req.headers['x-auth-token'] || req.query['access_token'] || req.body['access_token'] || req.headers['access_token'] || req.headers['access-token'] ||
        req.query['accessToken'] || req.body['accessToken'] || req.headers['accessToken'] || req.headers['authorization']
}

const verifyAccessToken = (accessToken: string): any => {
    return verify(accessToken, JWT_SECRET)
}

export default {
    createAccessToken,
    getTokenFromReq,
    verifyAccessToken
}