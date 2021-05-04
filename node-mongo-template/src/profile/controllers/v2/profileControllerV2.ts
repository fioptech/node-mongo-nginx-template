import { Request, Response } from "express";
import { IUser } from "../../../auth/models/User";
import { ResponseData } from "../../../shared/@types/ResponseData";
import RestError from "../../../shared/@types/RestError";
import AbstractController from "../../../shared/abstracts/AbstractController";
import { IProfile, Profile } from "../../models/Profile";

class ProfileControllerV2 extends AbstractController<IProfile> {
    constructor() {
        super(Profile)
    }

    async getMe(req: Request & { user: IUser }, res: Response) {
        const userId = req.user._id
        const profile = await Profile.findOne({ user: userId })
        if (!profile) throw new RestError({ errorCode: 'NOT_FOUND_MY_PROFILE' })

        res.json(new ResponseData({ profile }))
    }
}

export default new ProfileControllerV2()