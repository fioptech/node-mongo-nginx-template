import { Request, Response } from "express";
import { ResponseData } from "../../../shared/@types/ResponseData";
import RestError from "../../../shared/@types/RestError";
import tokenUtil, { AccessTokenData } from "../../utils/tokenUtil";
import { User } from "../../models/User";

const authenticate = async (req: Request, res: Response) => {
    const token = tokenUtil.getTokenFromReq(req)

    let data: AccessTokenData;
    try {
        data = tokenUtil.verifyAccessToken(token) as AccessTokenData
    } catch (e) {
        throw new RestError({ errorCode: 'TOKEN_NOT_VALID_1' })
    }

    const user = await User.findById(data.id)

    if (!user) throw new RestError({ errorCode: 'TOKEN_NOT_VALID_2' })

    res.json(new ResponseData({ user }))
}

const validateToken = async (req: Request, res: Response) => {
    const token = tokenUtil.getTokenFromReq(req)
    let data: AccessTokenData;
    try {
        data = tokenUtil.verifyAccessToken(token) as AccessTokenData
        res.json(new ResponseData({}))
    } catch (e) {
        throw new RestError({ errorCode: 'TOKEN_NOT_VALID_1' })
    }
}

export default {
    authenticate,
    validateToken
}