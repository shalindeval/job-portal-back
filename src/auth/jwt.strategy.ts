import { Injectable, UnauthorizedException } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import { InjectRepository } from "@nestjs/typeorm";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { Recruiter } from "src/recruiter/recruiter.entity";
import { RecruiterRepository } from "src/recruiter/recruiter.repository";
import { UsersRole } from "src/shared/users-role";
import { User } from "src/users/user.entity";
import { UsersRepository } from "src/users/users.repository";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
import { ConfigService} from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
        @InjectRepository(RecruiterRepository) private recruiterRepository: RecruiterRepository,
        private configService:ConfigService){
        super({
            secretOrKey:configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayloadDto){
        const {email, role} = payload
        const user: User|Recruiter = role===UsersRole['EMPLOYER']?await this.recruiterRepository.findOne({email}):await this.usersRepository.findOne({email})
        if(!user){
            throw new UnauthorizedException()
        }
        return user
    }
}