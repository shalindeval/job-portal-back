import { Module } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { RecruiterController } from './recruiter.controller';
import { RecruiterRepository } from './recruiter.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([RecruiterRepository]),
    AuthModule
  ],
  providers: [RecruiterService],
  controllers: [RecruiterController]
})
export class RecruiterModule {}
