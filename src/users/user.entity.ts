import { Exclude } from "class-transformer";
import { Job } from "src/jobs/job.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersRole } from "../shared/users-role";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({unique: true })
    email:string

    @Column()
    @Exclude({toPlainOnly: true})
    password:string
    
    @Column("bytea", {nullable: false})
    resume:Buffer

    @Column("bytea", {nullable: true})
    @Exclude({toPlainOnly: true})
    image:Buffer

    @ManyToMany(_type=>Job, job=>job.applicants, {eager:true})
    @JoinTable()
    jobs: Job[]
}