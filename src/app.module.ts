import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RecruiterModule } from './recruiter/recruiter.module';
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({
  imports: [
    
    ConfigModule.forRoot({
      envFilePath:[`.env.stage.${process.env.STAGE}`],
    }),

    JobsModule,

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService:ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod'
        
        return{
          ssl: isProduction,
          extra:{
            ssl: isProduction ? {rejectUnauthorized: false} : null,
          },
          type:'postgres',
          autoLoadEntities:true,
          synchronize:true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE')
        }
      }
    }),
  
    AuthModule,
  
    UsersModule,
  
    RecruiterModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
