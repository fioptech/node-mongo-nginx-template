import { Length, MinLength } from 'class-validator';

export default class SigninByUsernameForm {
    @MinLength(4)
    username: string

    @MinLength(6)
    password: string
}