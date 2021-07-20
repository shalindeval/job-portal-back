import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthModule } from 'src/auth/auth.module';
import { JobsRepository } from 'src/jobs/jobs.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([UsersRepository, JobsRepository]),
    AuthModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
