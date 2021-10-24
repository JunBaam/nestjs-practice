import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bycrpt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bycrpt.genSalt();
    //NOTE: salt(유니크한값) + password(유저가작성한 비밀번호) 를 해시화
    const hashedPassword = await bycrpt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });

    try {
      await user.save();
    } catch (error) {
      //NOTE: 실제에러코드 23505
      if (error.code === '23505') {
        throw new ConflictException('존재하는 유저네임');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
