import { Router } from "express";
import authenticateControllerV1 from "./controllers/v1/authenticateControllerV1";
import normalAuthControllerV1 from "./controllers/v1/normalAuthControllerV1";
import authenticateControllerV2 from "./controllers/v2/authenticateControllerV2";

// VERSION 1
const authRouterV1 = Router()

const normalAuthRouteV1 = Router()
normalAuthRouteV1.post('/signup', normalAuthControllerV1.signup)
normalAuthRouteV1.post('/signin', normalAuthControllerV1.signin)
normalAuthRouteV1.get('/authenticate', authenticateControllerV1.authenticate)
normalAuthRouteV1.get('/token', authenticateControllerV1.validateToken)


authRouterV1.use('/', normalAuthRouteV1)


// VERSION 2
const authRouterV2 = Router()
normalAuthRouteV1.get('/authenticate', authenticateControllerV2.authenticate)


export default {
    authRouterV1,
    authRouterV2
}