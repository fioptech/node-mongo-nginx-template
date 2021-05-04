import { Request, Response } from "express";
import { Document, Schema, model, Types, Model } from 'mongoose';
import { ResponseData } from "../@types/ResponseData";
import { parseQuery, QueryParams, } from "../middleware/parseQuery.middleware";

export default class AbstractController<T extends Document> {

    constructor(private model: Model<T>) {

    }

    find = [
        parseQuery,
        async (req: Request & { queryParams: QueryParams }, res: Response) => {
            const { whereParams, paginationParams, populateParams, selectParams, sortParams } = req.queryParams

            const query = this.model.find(whereParams)
            if (populateParams) query.populate(populateParams)
            if (selectParams) query.select(selectParams)
            if (sortParams) query.sort(sortParams)

            const { limit, offset } = paginationParams

            query.skip(offset).limit(limit)

            const [items, total] = await Promise.all([query, this.model.count(whereParams)])

            const totalPage = Math.ceil((total - offset) / limit)

            const data = new ResponseData({ items, totalPage, limit, offset })

            res.json(data)
        }
    ]

    create = [
        async (req: Request, res: Response) => {
            let data = req.body as T
            data = await this.model.create(data)
            res.json(new ResponseData({ item: data }))
        }
    ]

    findById = [
        async (req: Request, res: Response) => {
            const id = req.params.id

            const item = await this.model.findById(id)

            if (!item) {
                let data = new ResponseData(null, {
                    code: 'FIND_BY_ID_NOT_FOUND_' + this.model.modelName.toUpperCase(),
                    message: `Not found ${this.model.modelName} with id ${id}`
                })
                return res.json(data)
            }
            res.json(new ResponseData({ item }))
        }
    ]

    update = [
        async (req: Request, res: Response) => {
            const id = req.params.id

            let item = await this.model.findById(id)

            if (!item) {
                let data = new ResponseData(null, {
                    code: 'UPDATE_BY_ID_NOT_FOUND_' + this.model.modelName.toUpperCase(),
                    message: `Not found ${this.model.modelName} with id ${id}`
                })
                return res.json(data)
            }

            let data = req.body as T
            Object.assign(item, data)

            item = await item.save()

            res.json(new ResponseData({ item: data }))
        }
    ]

    remove = [
        async (req: Request, res: Response) => {
            const id = req.params.id

            let item = await this.model.findById(id)

            if (!item) {
                let data = new ResponseData(null, {
                    code: 'REMOVE_BY_ID_NOT_FOUND_' + this.model.modelName.toUpperCase(),
                    message: `Not found ${this.model.modelName} with id ${id}`
                })
                return res.json(data)
            }

            item = await item.remove()

            res.json(new ResponseData({ item }))
        }
    ]
}