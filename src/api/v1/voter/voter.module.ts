import { forwardRef, Module } from '@nestjs/common';
import { VoterController } from './infrastructure/voter.controller';
import { VoterService } from './application/services/voter.service';
import { VoterTypeOrm } from './infrastructure/typeorm/voter-typeorm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateModule } from '../candidate/candidate.module';

@Module({
  imports: [TypeOrmModule.forFeature([VoterTypeOrm]), CandidateModule ],
  providers: [VoterService],
  exports: [VoterService],
  controllers: [VoterController],
})
export class VoterModule {}
