import { Router } from "express";
import { loginRequired } from "../shared/middleware/loginRequired.middleware";
import { parseQuery } from "../shared/middleware/parseQuery.middleware";
import profileControllerV1 from "./controllers/v1/profileControllerV1";
import profileControllerV2 from "./controllers/v2/profileControllerV2";

// VERSION 1
const profileRouterV1 = Router()

profileRouterV1.get('/', loginRequired, profileControllerV1.find)
profileRouterV1.get('/me', loginRequired, parseQuery, profileControllerV1.getMe)
profileRouterV1.get('/:id', loginRequired, profileControllerV1.findById)

profileRouterV1.put('/me', loginRequired, profileControllerV1.updateMe)

// VERSION 2
const profileRouterV2 = Router()
profileRouterV2.get('/', loginRequired, profileControllerV2.find)

export default {
    profileRouterV1,
    profileRouterV2
}