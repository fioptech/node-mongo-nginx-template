require('express-async-errors')
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";
import * as cors from "cors";
import * as http from "http";
import * as mongoose from 'mongoose';


import { ResponseData } from "./shared/@types/ResponseData";
import appRouter from "./appRouter";
import { LogUtils } from "./shared/utils/LogUtils";

const { JWT_COOKIE_SECRET, PORT, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_DATABASE, MONGO_DB_HOST } = process.env as any


const app = express();
const server = new http.Server(app);

app.use(morgan('dev'))
app.use(cors({ credentials: true, origin: (origin, cb) => cb(null, true) }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(JWT_COOKIE_SECRET));

app.use(appRouter);

// ERROR HANDLE
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    LogUtils.e(err?.toString())
    const data = new ResponseData(undefined, { code: err.errorCode || 'UNKNOW_ERROR', message: err.message, stack: err.stack })
    res.json(data)
})

async function startServer() {
    try {
        const result = await mongoose.connect(MONGO_DB_HOST, { user: MONGO_INITDB_ROOT_USERNAME, pass: MONGO_INITDB_ROOT_PASSWORD, dbName: MONGO_INITDB_DATABASE});
        LogUtils.i('Connected database success!')
        server.listen(PORT, () => LogUtils.i("Server listening on port " + PORT));
    } catch (e) {
        LogUtils.e('Connect database error!' + e?.toString());
    }
}

startServer();
