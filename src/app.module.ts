import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './api/v1/configuration/typeorm-connfig.service';
import { VoterModule } from './api/v1/voter/voter.module';
import { CandidateModule } from './api/v1/candidate/candidate.module';
import { VoteModule } from './api/v1/vote/vote.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    VoterModule,
    CandidateModule,
    VoteModule,
  ],
})
export class AppModule {}
