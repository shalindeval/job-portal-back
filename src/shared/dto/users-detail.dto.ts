import { IsNotEmpty } from "class-validator";
import { UsersRole } from "../users-role";

export class UsersDetailsDto{
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    password: string

    // @IsNotEmpty()
    resume:Buffer

    // @IsNotEmpty()
    image: Buffer
}