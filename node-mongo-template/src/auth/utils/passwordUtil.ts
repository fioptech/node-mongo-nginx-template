import { compare, genSalt, hash } from "bcrypt";


const generateHashPassword = async (plainPassword: string): Promise<{ hashPassword: string, salt: string }> => {
    const salt: string = await genSalt(10)
    const hashPassword = await hash(plainPassword, salt)
    return { salt, hashPassword }
}

const comparePassword = async (plainPassword: string, hashPassword: string) => {
    return compare(plainPassword, hashPassword)
}

export default {
    generateHashPassword,
    comparePassword
}