import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  //NOTE: 서비스 주입
  constructor(private authService: AuthService) {}
  //   localhst:3001/auth/signUp
  @Post('/signup')
  signup(
    //NOTE: ValidationPipe: DTO에 있는 유효성조건을 맞는지 체크한다.
    @Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authcredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  //NOTE: 인증미들웨어(Guard) 추가
  @UseGuards(AuthGuard())
  // test(@Req() req) {
  //NOTE: 커스텀데코레이터 적용
  test(@GetUser() user: User) {
    console.log('req', user);
  }
}
