import { Request, Response } from "express"
import { ResponseData } from "../../../shared/@types/ResponseData"
import RestError from "../../../shared/@types/RestError"
import validateForm from "../../../shared/middleware/validateForm"
import SigninByUsernameForm from "../../dto/SigninByUsernameForm"
import SignupByUsernameForm from "../../dto/SignupByUsernameForm"
import passwordUtil from "../../utils/passwordUtil"
import tokenUtil from "../../utils/tokenUtil"
import { User } from "../../models/User"


const signup = [
    validateForm(SignupByUsernameForm),
    async (req: Request, res: Response) => {
        const data = req.body as SignupByUsernameForm

        // check if username existed
        const existedUser = await User.findOne({ username: data.username})
        if(existedUser) {
            throw new RestError({errorCode: 'USERNAME_EXISTED'})
        }

        const user = new User(data)
        try {
            const { hashPassword } = await passwordUtil.generateHashPassword(data.password)
            user.password = hashPassword
        } catch (e) {
            console.log(e)
            throw new RestError({ errorCode: 'GENERATE_HASH_PASSWORD_ERROR' })
        }
        await user.save()
        user.password = undefined
        const responseData = new ResponseData({ user })
        res.json(responseData)
    }
]

const signin = [
    validateForm(SigninByUsernameForm),
    async (req: Request, res: Response) => {
        const { password, username } = req.body as SigninByUsernameForm
        const user = await User.findOne({ username }).select('+password')
        if (!user) {
            throw new RestError({ errorCode: 'NOT_FOUND_USER' })
        }

        try {
            const isCorrect = passwordUtil.comparePassword(password, user.password as string)
            if (!isCorrect) throw new RestError({ errorCode: 'INCORRECT_PASSWORD' })

            const accessToken = tokenUtil.createAccessToken(user)

            user.password = undefined

            const responseData = new ResponseData({ user, accessToken })
            res.json(responseData)
        } catch (e) {
            throw new RestError({ errorCode: 'COMPARE_PASSWORD_ERROR' })
        }
    }
]

export default {
    signin,
    signup
}