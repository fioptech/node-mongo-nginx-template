import { Router } from "express";
import uploadImageController from "./uploadImageController";

// VERSION 1
const uploadRouterV1 = Router()

uploadRouterV1.post('/images', uploadImageController.uploadImage)


const uploadRouters = {
    uploadRouterV1,
}

export default uploadRouters