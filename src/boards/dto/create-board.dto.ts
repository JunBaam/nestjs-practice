import { IsNotEmpty } from 'class-validator';

//NOTE:   @IsNotEmpty() 유효성체크
export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
