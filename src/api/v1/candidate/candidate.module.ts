import { forwardRef, Module } from '@nestjs/common';
import { CandidateService } from './application/services/candidate.service';
import { CandidateController } from './infrastructure/candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateTypeOrm } from './infrastructure/typeorm/candidate-typeorm.entity';
import { VoterModule } from '../voter/voter.module';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateTypeOrm]), forwardRef(()=>VoterModule)],
  controllers: [CandidateController],
  exports: [CandidateService],
  providers: [CandidateService],
})
export class CandidateModule {}
