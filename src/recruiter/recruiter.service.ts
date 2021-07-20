import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecruiterDetailsDto } from 'src/shared/dto/recruiter-detail.dto';
import { UserLoginDto } from 'src/shared/dto/user-login.dto';
import { Recruiter } from './recruiter.entity';
import * as bcrypt from 'bcrypt'
import { RecruiterRepository } from './recruiter.repository';
import { AuthService } from 'src/auth/auth.service';
import { UsersRole } from 'src/shared/users-role';
import { User } from 'src/users/user.entity';


@Injectable()
export class RecruiterService {
    constructor(@InjectRepository(RecruiterRepository) private recruiterRepository: RecruiterRepository,
    private authService: AuthService){}

    async signUp(usersDetailsDto: RecruiterDetailsDto): Promise<Recruiter>{
        return this.recruiterRepository.signUp(usersDetailsDto)
    }

    async signIn(userLoginDto:UserLoginDto){
        const {email, password} = userLoginDto
        const user = await this.recruiterRepository.findOne({email})
        console.log(user)
        
        if(user && (await bcrypt.compare(password,user.password))){
            const payload = {email, role:UsersRole['EMPLOYER']}
            return {token:await this.authService.generateToken(payload), user}
        }else{
            throw new UnauthorizedException()
        }
    }

    async getUser(id:string){
        return this.recruiterRepository.getUser(id)
    }

    async updateRecruiter(id, body ){
        const user = await this.getUser(id)
        if(user){
            user.name = body.name
            user.organization = body.organization
            await this.recruiterRepository.save(user)
            return user
        }
    }
}
