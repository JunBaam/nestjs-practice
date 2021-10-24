import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

//NOTE: Custom decorater
//NOTE: req.user 를 바로 받아올수있게 한다 굳이 필요할까 싶다. 간결하게 보이기는 하는데 ..

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
