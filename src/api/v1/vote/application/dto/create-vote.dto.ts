import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  candidate_id: number;
}
