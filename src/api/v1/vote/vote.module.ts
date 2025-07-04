import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteTypeOrm } from './infrastructure/typeorm/vote-typeorm.entity';
import { VoteController } from './infrastructure/vote.controller';
import { VoteService } from './application/services/vote.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([VoteTypeOrm]), AuthModule],
  providers: [VoteService],
  controllers: [VoteController],
})
export class VoteModule {}
