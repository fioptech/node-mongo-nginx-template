import { Request, Response } from "express";
import { ResponseData } from "../shared/@types/ResponseData";


import * as en from "./en.json"
import * as vi from "./en.json"

const messages = {
    en, vi
}

const language = ['en', 'vi']

class MessageController {
    findByCode(req: Request, res: Response) {
        const code = req.params.code
        const lang = req.query.lang as string

        let message: any

        if (language.includes(lang)) {
            message = messages[lang][code]
        }

        if (!message) {
            message = messages['en'][code]
        }

        return res.json(new ResponseData({ message }))
    }
}

export default new MessageController()