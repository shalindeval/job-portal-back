import { IsNotEmpty } from "class-validator";
import { UsersRole } from "src/shared/users-role";

export class JwtPayloadDto{
    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    role:UsersRole
}