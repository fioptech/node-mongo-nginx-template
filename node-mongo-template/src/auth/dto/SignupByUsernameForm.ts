import { Length, IsNotEmpty, MinLength } from 'class-validator';
import { UserType } from '../models/User';

export default class SignupByUsernameForm {
    @MinLength(4)
    username: string

    @MinLength(6)
    password: string

    @IsNotEmpty()
    type: UserType
}