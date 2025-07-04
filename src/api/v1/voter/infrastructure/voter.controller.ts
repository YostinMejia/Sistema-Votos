import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Voter } from '../domain/voter.interface';
import { VoterService } from '../application/services/voter.service';
import { CreateVoterDto } from '../application/dto/create-voter.dto';
import { DeleteResult } from 'typeorm';

@Controller('voters')
export class VoterController {
  constructor(private voterService: VoterService) {}

  @Post()
  create(@Body() body: CreateVoterDto): Promise<Voter> {
    return this.voterService.create(body);
  }

  @Get(':id')
  getById(
    @Param('id', new ParseIntPipe({})) id: number,
  ): Promise<Voter | null> {
    return this.voterService.findVoterById(id);
  }

  @Get()
  getAll(): Promise<Voter[]> {
    return this.voterService.findAll();
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<DeleteResult> {
    return this.voterService.delete(id);
  }
}
