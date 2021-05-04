import { Router } from "express";
import messageController from "./messageController";

// VERSION 1
const messageRouterV1 = Router()

messageRouterV1.get('/:code', messageController.findByCode)

export default {
    messageRouterV1
}