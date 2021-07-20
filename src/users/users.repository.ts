import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { UsersDetailsDto } from "../shared/dto/users-detail.dto";
import * as bcrypt from 'bcrypt'
import { UserLoginDto } from "../shared/dto/user-login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { JobsRepository } from "src/jobs/jobs.repository";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{

    async signUp(usersDetailsDto:UsersDetailsDto): Promise<User>{
        console.log(usersDetailsDto.name)
        const {name,email,password,resume,image} = usersDetailsDto
        
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = this.create({name, email, password:hashedPassword, resume, image})
        await this.save(user)
        return user
    }

    async getUser(id){
        const user = this.findOne({id})
        if(!user){
            throw new NotFoundException()
        }
        return user
    }


}