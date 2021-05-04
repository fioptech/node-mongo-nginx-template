import { Router } from 'express'
import authRouters from './auth'
import profileRouters from './profile'
import uploadRouters from './upload'
import messageRouters from './message'


const appRouterV1 = Router()
appRouterV1.use('/auth', authRouters.authRouterV1)
appRouterV1.use('/profiles', profileRouters.profileRouterV1)
appRouterV1.use('/upload', uploadRouters.uploadRouterV1)
appRouterV1.use('/messages', messageRouters.messageRouterV1)


const appRouterV2 = Router()
appRouterV2.use('/auth', authRouters.authRouterV2)
appRouterV1.use('/profiles', profileRouters.profileRouterV2)


const appRouter = Router()
appRouter.use('/v1', appRouterV1)
appRouter.use('/v2', appRouterV2)

export default appRouter