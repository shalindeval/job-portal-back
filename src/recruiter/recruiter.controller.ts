import { Body, Controller, Delete, Get, Param, Post,UseGuards } from '@nestjs/common';
import { UserLoginDto } from 'src/shared/dto/user-login.dto';
import { RecruiterService } from './recruiter.service';
import {RecruiterDetailsDto} from '../shared/dto/recruiter-detail.dto'
import {AuthGuard} from '@nestjs/passport'

@Controller('recruiter')
export class RecruiterController {
    constructor(private recruiterService: RecruiterService){}

    @Post('/register')
    signUp(@Body() recruitersDetailsDto: RecruiterDetailsDto){
        return this.recruiterService.signUp(recruitersDetailsDto)
    }

    @Post('/login')
    signIn(@Body() recruiterLoginDto: UserLoginDto){
        return this.recruiterService.signIn(recruiterLoginDto)
    }

    @UseGuards(AuthGuard())
    @Get('/:id')
    getUserById(@Param('id') id:string){
        return this.recruiterService.getUser(id)
    }

    @UseGuards(AuthGuard())
    @Post('/:id')
    updateRecruiter(@Param('id') id:string, @Body() body){
        return this.recruiterService.updateRecruiter(id, body)
    }
}
