import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './board.entity';
import { BoardStatus } from './boards-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  // NOTE: private(접근제한자) 선언시 암묵적으로 property 로 선언된다
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  //NOTE: 핸들러수준 파이프
  @UsePipes(ValidationPipe) //NOTE: Promise 형식으로 리턴되기떄문에 Promise 지정
  createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
    // NOTE: 서비스를 가지고온다
    return this.boardsService.createBoard(CreateBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id') //NOTE: ParseIntPipe : js integer가 number 가 아니면 error를 발생
  deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  //NOTE: 게시물 상태 업데이트
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }

  // //NOTE: 서비스를 이용한 핸들러
  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }
  // // NOTE: Body로 가져옴
  // @Post()
  // //NOTE: 핸들러수준 파이프
  // @UsePipes(Valid ationPipe)
  // createBoard(@Body() CreateBoardDto: CreateBoardDto): Board {
  //   // NOTE: 서비스를 가지고온다
  //   return this.boardsService.createBoard(CreateBoardDto);
  // }
  // // NOTE: Param (query-string)
  // @Get('/:id')
  // // NOTE: 모든 쿼리스트링값 가져오기 (@Param() params:string[])
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id);
  // }
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
