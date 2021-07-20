import { RecruiterDetailsDto } from "src/shared/dto/recruiter-detail.dto";
import { EntityRepository, Repository } from "typeorm";
import { Recruiter } from "./recruiter.entity";
import * as bcrypt from 'bcrypt'
import { NotFoundException } from "@nestjs/common";
import { UserLoginDto } from "src/shared/dto/user-login.dto";

@EntityRepository(Recruiter)
export class RecruiterRepository extends Repository<Recruiter>{
    async signUp(usersDetailsDto:RecruiterDetailsDto): Promise<Recruiter>{
        const {name,email,password,organization} = usersDetailsDto
        
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = this.create({name, email, password:hashedPassword, organization})
        await this.save(user)
        return user
    }

    async signIn(userLoginDto:UserLoginDto){
        const {email, password} = userLoginDto
        const user = await this.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            return 'login successful'
        }else{
            return new NotFoundException()
        } 
    }

    async getUser(id){
        const user = this.findOne({id})
        if(!user){
            throw new NotFoundException()
        }
        return user
    }
}