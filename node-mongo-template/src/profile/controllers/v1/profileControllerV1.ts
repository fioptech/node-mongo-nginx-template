import { Request, Response } from "express";
import { IUser } from "../../../auth/models/User";
import { ResponseData } from "../../../shared/@types/ResponseData";
import RestError from "../../../shared/@types/RestError";
import AbstractController from "../../../shared/abstracts/AbstractController";
import { QueryParams } from "../../../shared/middleware/parseQuery.middleware";
import { LogUtils } from "../../../shared/utils/LogUtils";
import UpdateMeForm from "../../dto/UpdateMeForm";
import { IProfile, Profile } from "../../models/Profile";
import profileControllerV2 from "../v2/profileControllerV2";

class ProfileControllerV1 extends AbstractController<IProfile> {
    constructor() {
        super(Profile)
    }

    async getMe(req: Request & { user: IUser, queryParams: QueryParams }, res: Response) {
        const userId = req.user._id

        const { populateParams, selectParams } = req.queryParams

        let profile = await Profile.findOne({ user: userId }).select(selectParams)

        if (!profile) {
            // create my empty profile
            profile = new Profile({ user: userId })
            await profile.save()
        }

        if (populateParams) {
            for (let populateParam of populateParams) {
                profile = profile.populate(populateParam)
            }
            await profile.execPopulate()
        }

        res.json(new ResponseData({ profile }))
    }

    async updateMe(req: Request & { user: IUser }, res: Response) {
        const userId = req.user._id

        const profile = await Profile.findOne({ user: userId })

        if (!profile) {
            throw new RestError({ errorCode: 'NOT_FOUND_PROFILE' })
        }

        const data = req.body as UpdateMeForm
        Object.assign(profile, data)

        await profile.save()

        res.json(new ResponseData({ profile }))
    }
}

export default new ProfileControllerV1()