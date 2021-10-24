import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { typeORMconfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    //NOTE: DB Connection
    TypeOrmModule.forRoot(typeORMconfig),
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}
