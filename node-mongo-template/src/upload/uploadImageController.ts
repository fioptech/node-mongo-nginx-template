import { Request, Response } from 'express';
import { extname } from "path";
import * as multer from "multer";
import { generateFileName } from './fileUtil';
import RestError from '../shared/@types/RestError';
import { ResponseData } from '../shared/@types/ResponseData';


const IMAGE_STORAGE_PATH = process.env.IMAGE_STORAGE_PATH as string

const storage = multer.diskStorage({
    destination: (req, file, done) => done(null, IMAGE_STORAGE_PATH),
    filename: (req, file, done) => done(null, `${generateFileName()}${extname(file.originalname)}`)
})

const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const ext = extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new RestError({ errorCode: 'INVALID_IMAGE_FILE_FOMAT' }))
        } else {
            callback(null, true)
        }
    },
    limits: {
        fileSize: 100 * 1024 * 1024 * 1024,
        fieldSize: 100 * 1024 * 1024 * 1024,
    }
});

const uploadImage = [
    upload.single('file'),
    async (req: Request, res: Response) => {
        if (req.file) {
            const data = new ResponseData({ url: `/images/${req.file.filename}` })
            return res.json(data)
        } else {
            throw new RestError({ errorCode: 'NOT_RECEIVE_FILE', message: "Not receive file" })
        }
    }
]

const uploadImages = [
    async (req: Request, res: Response) => {
        throw new RestError({ errorCode: 'NOT_SUPPORT_MULTI_FILE', message: "Not support upload multiple file!" })
    }
]

export default {
    uploadImage,
    uploadImages
}