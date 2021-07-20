import { Exclude } from "class-transformer";
import { Recruiter } from "src/recruiter/recruiter.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    title:string;

    @Column()
    description:string;
    
    @Column()
    experience:number;
    
    @ManyToOne(_type=>Recruiter, recruiter=>recruiter.jobs, {eager:false})
    @Exclude({toPlainOnly: true})
    recruiters: Recruiter

    @ManyToMany(_type=>User, user=>user.jobs, {eager:false, onDelete:'CASCADE'})
    @Exclude({toPlainOnly: true})
    applicants: User[]
}