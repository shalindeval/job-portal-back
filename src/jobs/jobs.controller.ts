import { Body, Controller, Delete, Get, Param, Post, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JobsDto } from './dto/jobs.dto';
import { SearchDto } from './dto/search.dto';
import { Job } from './job.entity';
import { JobsService } from './jobs.service';
import {AuthGuard} from '@nestjs/passport'
import { UsersRole } from 'src/shared/users-role';
import { Recruiter } from 'src/recruiter/recruiter.entity';
import { User } from 'src/users/user.entity';
import { UsersDetailsDto } from 'src/shared/dto/users-detail.dto';

@Controller('jobs')
@UseGuards(AuthGuard())
export class JobsController {
    constructor(private jobsService: JobsService){}

    @Get("/")
    getJobs(@Query() searchDto: SearchDto, @Req() req): Promise<Job[]> {
        if(req.user  instanceof User){
            return this.jobsService.getJobs(searchDto)
        }else{
            return this.jobsService.getJobs(searchDto, req.user)
        }
    }

    @Post("/create")
    createJob(@Body() jobsDto: JobsDto, @Req() req): Promise<Job>{
        if(req.user instanceof User){
            throw new UnauthorizedException()
        }
        return this.jobsService.createJob(jobsDto, req.user)
    }

    // @Post("/apply/:id")
    // applyForJob(@Param('id') id: string, @Req() req){
    //     if(req.user.role != UsersRole['EMPLOYEE']){
    //         throw new UnauthorizedException()
    //     }        
    //     return this.jobsService.applyForJob(id)
    // }

    @Delete('/:id')
    deleteJob(@Param('id') id:string, @Req() req){
        if(req.user instanceof User){
            throw new UnauthorizedException()
        }
        return this.jobsService.deleteJob(id)
    }
}
