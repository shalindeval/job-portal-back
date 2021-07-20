import { IsNotEmpty } from "class-validator";

export class JobsDto{

    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    description:string;
    
    @IsNotEmpty()
    experience:number;
}