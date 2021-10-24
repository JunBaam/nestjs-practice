//NOTE: typeOrm 설정파일
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMconfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  //NOTE: entities 를 이용해서 db table 을 생성
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  //NOTE: true를 주면 app을 다시 실행할때, 엔티티안에서 수정된 컬럼을 다시 생성해줌
  synchronize: dbConfig.synchronize,
};
