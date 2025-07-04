import { InjectRepository } from '@nestjs/typeorm';
import { VoterTypeOrm } from '../../infrastructure/typeorm/voter-typeorm.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Voter } from '../../domain/voter.interface';
import { CreateVoterDto } from '../dto/create-voter.dto';
import { BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { CandidateService } from 'src/api/v1/candidate/application/services/candidate.service';

export class VoterService {
  constructor(
    @InjectRepository(VoterTypeOrm)
    private voterRepository: Repository<VoterTypeOrm>,
    @Inject(forwardRef(()=>CandidateService))
    private candidateService: CandidateService
  ) { }

  findAll(): Promise<Voter[]> {
    return this.voterRepository.find();
  }

  findVoterById(id: number): Promise<Voter | null> {
    return this.voterRepository.findOneBy({ id });
  }

  async create(createVoterDto: CreateVoterDto): Promise<Voter> {
    if (await this.candidateService.findByName(createVoterDto.name))
      throw new BadRequestException("A Voter can't be a Candidate and vice versa",);

    if (await this.voterRepository.findOneBy({ email: createVoterDto.email }))
      throw new BadRequestException('Email registered already');

    return this.voterRepository.save(createVoterDto);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.voterRepository.delete({ id: id });
  }

  findByName(name: string) {
    return this.voterRepository.findOneBy({ name });
  }

  voted(id: number) {
    return this.voterRepository.update({ id }, { has_voted: true });
  }
}
