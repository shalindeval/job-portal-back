import { NotFoundException } from "@nestjs/common";
import { RecruiterDetailsDto } from "src/shared/dto/recruiter-detail.dto";
import { UsersDetailsDto } from "src/shared/dto/users-detail.dto";
import { EntityRepository, Repository } from "typeorm";
import { SearchDto } from "./dto/search.dto";
import { Job } from "./job.entity";

@EntityRepository(Job)
export class JobsRepository extends Repository<Job>{
    
    async findJobs(searchDto:SearchDto, recruiter?: RecruiterDetailsDto): Promise<Job[]>{
        const query = this.createQueryBuilder('job')
        const{searchTerm} = searchDto

        if(recruiter){
            query.where({recruiters:recruiter})
        }

        if(searchTerm){
            query.andWhere('LOWER(job.title) LIKE LOWER(:search) OR LOWER(job.description) LIKE LOWER(:search)', {search:`%${searchTerm}%`})
        }

        const jobs = await query.getMany()
        return jobs
    }

    async createJob(jobsDto, user: RecruiterDetailsDto): Promise<Job>{
        const {title,description,experience} = jobsDto
        const job = this.create({title,description,experience,recruiters:user})
        await this.save(job)
        return job
    }

    async findById(id:string):Promise<Job>{
        const job = await this.findOne(id)
        if(!job){
            throw new NotFoundException()
        }
        return job
    }

}