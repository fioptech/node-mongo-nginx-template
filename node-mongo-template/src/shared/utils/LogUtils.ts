const APP_ENV = process.env.APP_ENV
const DEVELOPMENT = 'development'

const e = (e: any, ...params: any[]) => {
    console.error(e, ...params)
}

const i = (i: any, ...params: any[]) => {
    console.info(i, ...params)
}

const w = (w: any, ...params: any[]) => {
    console.warn(w, ...params)
}

const log = (log: any, ...params: any[]) => {
    console.log(log, ...params)
}

/**
 * this log use for dev only
 */
const d = (d: any, ...params: any[]) => {
    if(APP_ENV === DEVELOPMENT) console.log(e, ...params)
}

export const LogUtils = {
    e, i, w, log, d
}