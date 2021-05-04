import { Request, Response, NextFunction } from "express";
import RestError from "../@types/RestError";

export type PaginationParams = {
    limit: number,
    offset: number
}

const queryMapping = {
    "fgt": (value: any) => ({ $gt: value }),
    "fgte": (value: any) => ({ $gte: value }),
    "flt": (value: any) => ({ $lt: value }),
    "flte": (value: any) => ({ $lte: value }),
    "fin": (value: string) => ({ $in: value }),
    "f": (value: any) => value,
    "select": (value: any) => value,
    "sort": (value: any) => ({}),
    "": (value: any) => value,
}

export type QueryParams = {
    whereParams?: any,
    paginationParams: PaginationParams,
    selectParams?: Array<string>,
    populateParams?: Array<string>,
    sortParams?: any
}

export const parseQuery = (req: Request & { queryParams: any }, res: Response, next: NextFunction) => {

    let whereParams: any = {};
    let paginationParams: PaginationParams = { limit: 10, offset: 0 };
    let selectParams: Array<string> | undefined;
    let populateParams: Array<string> = [];
    let sortParams: any = {}

    Object.keys(req.query).forEach(property => {
        let [prefix, key] = property.split("_");
        if (key) {
            let value = req.query[property];
            whereParams[key] = queryMapping[prefix](value);
        } else if (prefix == 'select') {
            selectParams = (req.query.select as any).split(",");
        } else if (prefix == 'relations') {
            populateParams = (req.query.relations as any).split(",")
        } else if (prefix == 'limit') {
            paginationParams.limit = parseInt((req.query.limit as any)) as any;
            if (isNaN(paginationParams.limit as any)) {
                throw new RestError({ errorCode: 'QUERY_INVALID', message: 'Invalid query limit' })
            }
        } else if (prefix == 'offset') {
            paginationParams.offset = parseInt((req.query.offset as any)) as any;
            if (isNaN(paginationParams.offset as any)) throw new RestError({ errorCode: 'QUERY_INVALID', message: 'Invalid query offset' })
        } else if (prefix == 'order') {
            let fields: Array<string> = (req.query.order as any).split(",");
            fields.forEach(field => {
                if (field.indexOf('-') == 0) sortParams[field.substring(1)] = 'DESC';
                else sortParams[field] = 'ASC';
            });
        }
    })

    const queryParams: QueryParams = { whereParams, paginationParams, selectParams, populateParams, sortParams };

    req.queryParams = queryParams;

    next();
}