import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { VoterTypeOrm } from '../voter/infrastructure/typeorm/voter-typeorm.entity';
import { CandidateTypeOrm } from '../candidate/infrastructure/typeorm/candidate-typeorm.entity';
import { VoteTypeOrm } from '../vote/infrastructure/typeorm/vote-typeorm.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('DATABASE_HOST'),
      port: +this.configService.get('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_NAME'),
      entities: [VoterTypeOrm, CandidateTypeOrm, VoteTypeOrm],
      synchronize: true,
    };
  }
}
