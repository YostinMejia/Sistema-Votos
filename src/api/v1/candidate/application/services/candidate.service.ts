import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCandidateDto } from '../dto/create-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidateTypeOrm } from '../../infrastructure/typeorm/candidate-typeorm.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Candidate } from '../../domain/candidate.interface';
import { VoterService } from 'src/api/v1/voter/application/services/voter.service';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(CandidateTypeOrm)
    private candidateRepository: Repository<CandidateTypeOrm>,
    @Inject(forwardRef(()=>VoterService)) private voterService: VoterService,
  ) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    if (await this.voterService.findByName(createCandidateDto.name))
      throw new BadRequestException("A Voter can't be a Candidate and vice versa",);
    return this.candidateRepository.save(createCandidateDto);
  }

  findByName(name:string):Promise<Candidate|null>{
    return this.candidateRepository.findOneBy({name})
  }
  addVote(id: number, votes: number) {
    return this.candidateRepository.update({ id }, { votes: votes + 1 });
  }

  findAll(): Promise<Candidate[]> {
    return this.candidateRepository.find();
  }

  findCandidateById(id: number): Promise<Candidate | null> {
    return this.candidateRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.candidateRepository.delete({ id });
  }
}
