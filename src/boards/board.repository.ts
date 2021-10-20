import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

//NOTE: DB 관련로직을 repository 에서 처리한다 이를 repository pattern 이라 한다.

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    //NOTE: 보드 객체생성
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    //NOTE: 저장
    await this.save(board);
    return board;
  }
}
