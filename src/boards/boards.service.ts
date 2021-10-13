import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  // NOTE: 모든 board list
  private boards: Board[] = [];

  // NOTE: 리턴값정의
  getAllBoards(): Board[] {
    return this.boards;
  }
  //NOTE: 게시판 생성 (단일)
  createBoard(title: string, description: string) {
    const board: Board = {
      id: uuid(), //NOTE: 유니크한 id 생성
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    //NOTE: createBoard 로 생성된 게시판을 배열에 넣는다
    this.boards.push(board);
    return board; //NOTE: 만들어진 board를 리턴
  }
}
