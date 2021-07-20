import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, UploadedFiles, Req, Query, Patch, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from '../shared/dto/user-login.dto';
import { UsersDetailsDto } from '../shared/dto/users-detail.dto';
import { UsersService } from './users.service';
import {AuthGuard} from '@nestjs/passport'
import { FileInterceptor, FilesInterceptor,FileFieldsInterceptor } from "@nestjs/platform-express";
import { UsersRole } from 'src/shared/users-role';
import { Recruiter } from 'src/recruiter/recruiter.entity';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post('/register')
    @UseInterceptors(FileFieldsInterceptor([{name:'resume'}, {name:'image'}]))
    signUp(@Body() usersDetailsDto: UsersDetailsDto, 
    @UploadedFiles() files){
        console.log(files)
        usersDetailsDto.resume = files.resume[0].buffer
        // usersDetailsDto.image = files.image[0].buffer
        return this.usersService.signUp(usersDetailsDto)
    }

    @Post('/login')
    signIn(@Body() userLoginDto: UserLoginDto){
        return this.usersService.signIn(userLoginDto)
    }

    @UseGuards(AuthGuard())
    @Get('/:id') //user profile
    getUserById(@Param('id') id:string){
        return this.usersService.getUser(id)
    }

    @UseGuards(AuthGuard())
    @Get('/applications')
    getUserApplications(@Query('userId') userId:string){
        return this.usersService.getUserApplications(userId)
    }

    @UseGuards(AuthGuard())
    @Post("/apply/")
    applyForJob(@Body('jobId') jobId: string, @Req() req){
        if(req.user instanceof Recruiter){
            throw new UnauthorizedException()
        }        
        return this.usersService.applyToJob(jobId, req.user)
    }

    @UseGuards(AuthGuard())
    @Post('/:id')
    updateUser(@Param('id') id:string, @Body() body){
        return this.usersService.updateUser(id, body)
    }

    @UseGuards(AuthGuard())
    @Post('/resume/:id')
    @UseInterceptors(FileInterceptor('resume'))
    updateResume(@Param('id') id:string, @UploadedFile() file){
        return this.usersService.updateResume(id, file)
    }


}
