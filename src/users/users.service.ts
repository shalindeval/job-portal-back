import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDto } from '../shared/dto/user-login.dto';
import { UsersDetailsDto } from '../shared/dto/users-detail.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt'
import { AuthService } from 'src/auth/auth.service';
import { UsersRole } from "src/shared/users-role";
import { JobsRepository } from 'src/jobs/jobs.repository';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository,
                @InjectRepository(JobsRepository) private jobsRepository: JobsRepository,
                private authService: AuthService){}

    async signUp(usersDetailsDto: UsersDetailsDto): Promise<User>{
        return this.usersRepository.signUp(usersDetailsDto)
    }

    async signIn(userLoginDto:UserLoginDto){
        const {email, password} = userLoginDto
        const user = await this.usersRepository.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            const payload = {email,role:UsersRole['EMPLOYEE']}
            return {token:await this.authService.generateToken(payload), user}
        }else{
            throw new UnauthorizedException()
        } 
    }

    async getUser(id:string){
        return this.usersRepository.getUser(id)
    }

    async getUserApplications(userId:string){
        return (await this.usersRepository.getUser(userId)).jobs
    }

    async applyToJob(jobId:string, user:UsersDetailsDto){
    
        const applicant = await this.usersRepository.findOne({email:user.email})
        const job = await this.jobsRepository.findById(jobId)
        if(!applicant || !job){
            throw new NotFoundException()
        }

        applicant.jobs.push(job)
        await this.usersRepository.save(applicant)
        console.log(applicant)
        return applicant

    }

    async updateUser(id, body){
        const user = await this.getUser(id)
        if(user){
            user.name = body.name
            await this.usersRepository.save(user)
            return user
        }
    }

    async updateResume(id,file){
        const user = await this.getUser(id)
        if(user){
            user.resume = file
            await this.usersRepository.save(user)
            return user
        }
    }
}
