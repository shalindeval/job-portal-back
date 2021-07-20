import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecruiterDetailsDto } from 'src/shared/dto/recruiter-detail.dto';
import { UsersDetailsDto } from 'src/shared/dto/users-detail.dto';
import { JobsDto } from './dto/jobs.dto';
import { SearchDto } from './dto/search.dto';
import { Job } from './job.entity';
import { JobsRepository } from './jobs.repository';

@Injectable()
export class JobsService {
    constructor(@InjectRepository(JobsRepository) private jobsRepository: JobsRepository){}

    async createJob(jobsDto: JobsDto, user: RecruiterDetailsDto): Promise<Job>{
        return this.jobsRepository.createJob(jobsDto, user)
    }

    async getJobs(searchDto: SearchDto, recruiter?:RecruiterDetailsDto): Promise<Job[]>{
        if(recruiter){
            const jobs = this.jobsRepository.findJobs(searchDto, recruiter)
            return jobs
        }else{
            const jobs = this.jobsRepository.findJobs(searchDto)
            return jobs
        }

    }

    // async applyForJob(id:string){
    //     return this.jobsRepository.applyForJob(id)
    // }

    async deleteJob(id:string){
        const job = this.jobsRepository.delete({id})
        if(!job){
            return new NotFoundException()
        }
    }
}
