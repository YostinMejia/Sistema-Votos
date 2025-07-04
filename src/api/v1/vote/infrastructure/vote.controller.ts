import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateVoteDto } from '../application/dto/create-vote.dto';
import { VoteService } from '../application/services/vote.service';
import { Vote } from '../domain/vote.interface';
import { VoteStatistics } from '../domain/vote-statistics';
import { JwtAuthGuard } from '../../auth/application/guards/jwt-auth.guard';
import { TokenPayload } from '../../auth/domain/token-payload';

@Controller('votes')
export class VoteController {
  constructor(private voteService: VoteService) { }

  //Para poder votar necesita estar registrado y pasar el token
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateVoteDto, @Request() req: { user: TokenPayload }): Promise<Vote> {
    console.log(req.user);
    
    return this.voteService.create(body, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/statistics')
  getStatistics(): Promise<VoteStatistics> {
    return this.voteService.statistics();
  }

  @Get()
  getAll(): Promise<Vote[]> {
    return this.voteService.findAll();
  }
}
