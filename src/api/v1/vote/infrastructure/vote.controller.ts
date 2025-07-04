import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVoteDto } from '../application/dto/create-vote.dto';
import { VoteService } from '../application/services/vote.service';
import { Vote } from '../domain/vote.interface';
import { VoteStatistics } from '../domain/vote-statistics';

@Controller('votes')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Post('')
  create(@Body() body: CreateVoteDto): Promise<Vote> {
    return this.voteService.create(body);
  }

    @Get('/statistics')
    getById(): Promise<VoteStatistics> {
      return this.voteService.statistics();
    }

  @Get()
  getAll(): Promise<Vote[]> {
    return this.voteService.findAll();
  }
}
