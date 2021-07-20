import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/users.repository';
import { RecruiterRepository } from 'src/recruiter/recruiter.repository';
import { JwtStrategy } from './jwt.strategy';
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({
  imports:[
    ConfigModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService:ConfigService) => {
        return{
          secret: configService.get('JWT_SECRET'),
          signOptions:{
            expiresIn:3600
          }
        }
      }

    }),
    TypeOrmModule.forFeature([UsersRepository, RecruiterRepository])
  ],
  providers: [AuthService, JwtStrategy],
  exports:[AuthService, JwtStrategy, PassportModule]
})
export class AuthModule {}
