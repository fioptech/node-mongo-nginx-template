import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";


export default async function <T extends Object>(formClass: { new(...args): T }, data: any): Promise<{ form?: T, errors?: any }> {
    let form = plainToClass(formClass, [data])[0]
    let errors = await validate(form)
    if (errors && errors.length > 0) {
        let validateErrors: any = errors
        return { errors: validateErrors }
    }
    return { form }
}