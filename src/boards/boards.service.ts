import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  //NOTE: repository 연결
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    //NOTE: DB 관련로직을 repository 에서 처리후 리턴한다.
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('존재하지 않는 id!');
    }
    return found;
  }

  //NOTE: 리턴값이 없으므로 void
  //NOTE: 몇개를 지웠는지 (영향을주었는지) affected 로 표기
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('없는 id 랑 꼐');
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  // // NOTE: 모든 board list local Memory
  // private boards: Board[] = [];
  // // NOTE: 리턴값정의
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // //NOTE: 게시판 생성 (단일)
  // createBoard(CreateBoardDto: CreateBoardDto) {
  //   const { title, description } = CreateBoardDto;
  //   const board: Board = {
  //     id: uuid(), //NOTE: 유니크한 id 생성
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   //NOTE: createBoard 로 생성된 게시판을 배열에 넣는다
  //   this.boards.push(board);
  //   return board; //NOTE: 만들어진 board를 리턴
  // }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   // NOTE: 값이 없으면 404
  //   if (!found) {
  //     throw new NotFoundException('존재하지 않는 id 입니다 ㅇㅇ ');
  //   }
  //   return found;
  // }
  // //NOTE: 리턴값이 없으므로 void
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
