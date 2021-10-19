import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { typeORMconfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    //NOTE: DB Connection
    TypeOrmModule.forRoot(typeORMconfig),
    BoardsModule,
  ],
})
export class AppModule {}
