import { NextFunction, Request, Response } from "express";
import RestError from "../@types/RestError";
import validForm from "../validators/validForm";

const validateForm = (formClass: { new(...args): Object }) => async (req: Request, res: Response, next: NextFunction) => {
    const { form, errors } = await validForm(formClass, req.body)
    if (errors) {
        console.log(errors)
        throw new RestError({ errorCode: 'VALIDATE_ERROR' })
    }
    next()
}

export default validateForm