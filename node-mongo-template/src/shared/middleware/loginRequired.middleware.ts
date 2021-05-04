import { NextFunction, Request, Response } from "express";
import tokenUtil, { AccessTokenData } from "../../auth/utils/tokenUtil";
import { IUser, User } from "../../auth/models/User";
import RestError from "../@types/RestError";

export const loginRequired = async (req: Request & { user: IUser }, res: Response, next: NextFunction) => {
    const token = tokenUtil.getTokenFromReq(req)

    let data: AccessTokenData;
    try {
        data = tokenUtil.verifyAccessToken(token) as AccessTokenData
    } catch (e) {
        throw new RestError({ errorCode: 'TOKEN_NOT_VALID_1' })
    }

    const user = await User.findById(data.id)

    if (!user) throw new RestError({ errorCode: 'TOKEN_NOT_VALID_2' })

    req.user = user
    next()
}