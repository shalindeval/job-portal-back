import { Job } from "src/jobs/job.entity";
import { UsersRole } from "src/shared/users-role";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recruiter{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({unique: true })
    email:string

    @Column()
    password:string
    
    @Column()
    organization:String

    @OneToMany(_type=>Job, job=>job.recruiters, {eager:true})
    jobs: Job[]
}