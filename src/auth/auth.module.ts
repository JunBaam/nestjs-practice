import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

// const jwtConfig = config.get('jwt');

@Module({
  //NOTE: Repository 연결
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      //NOTE: Jwt secret text
      // secret: process.env.JWT_SECRET || jwtConfig.secret,
      secret: 'Secret1234',
      signOptions: {
        // expiresIn: jwtConfig.expiresIn,
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  //NOTE: auth 모듈에서 사용
  providers: [AuthService, JwtStrategy],
  //NOTE: 다른모듈 에서도 사용
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
