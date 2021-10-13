import { Controller, Get } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  // NOTE: private(접근제한자) 선언시 암묵적으로 property 로 선언된다
  constructor(private boardsService: BoardsService) {}

  //NOTE: 서비스를 이용한 핸들러
  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }
}
