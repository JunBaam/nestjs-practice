//NOTE: typeOrm 설정파일

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'anwjr1198@',
  database: 'board-app',
  //NOTE: entities 를 이용해서 db table 을 생성
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  //NOTE: true를 주면 app을 다시 실행할때, 엔티티안에서 수정된 컬럼을 다시 생성해줌
  synchronize: true,
};
