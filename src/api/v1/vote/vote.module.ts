import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteTypeOrm } from './infrastructure/typeorm/vote-typeorm.entity';
import { VoteController } from './infrastructure/vote.controller';
import { VoteService } from './application/services/vote.service';

@Module({
  imports: [TypeOrmModule.forFeature([VoteTypeOrm])],
  providers: [VoteService],
  controllers: [VoteController],
})
export class VoteModule {}
