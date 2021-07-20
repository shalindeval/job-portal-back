import { IsNotEmpty } from "class-validator";
import { UsersRole } from "../users-role";

export class RecruiterDetailsDto{
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    organization:String
}