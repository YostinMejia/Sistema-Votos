import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateVoteDto } from '../dto/create-vote.dto';
import { VoteTypeOrm } from '../../infrastructure/typeorm/vote-typeorm.entity';
import { Vote } from '../../domain/vote.interface';
import { BadRequestException } from '@nestjs/common';
import { VoterTypeOrm } from 'src/api/v1/voter/infrastructure/typeorm/voter-typeorm.entity';
import { CandidateTypeOrm } from 'src/api/v1/candidate/infrastructure/typeorm/candidate-typeorm.entity';
import { VoteStatistics } from '../../domain/vote-statistics';

export class VoteService {
  constructor(
    @InjectRepository(VoteTypeOrm)
    private voteRepository: Repository<VoteTypeOrm>,
    private dataSource: DataSource,
  ) { }

  findAll(): Promise<Vote[]> {
    return this.voteRepository.find();
  }

  async statistics(): Promise<VoteStatistics> {
    const votes = await this.voteRepository.find({ relations: { candidate: true } })
    const statistics = {}

    for (const vote of votes) {

      if (!statistics[vote.candidate.id]) {
        statistics[vote.candidate.id] = {
          votes: 0,
          candidate: vote.candidate.name,
          percentage: 0
        };
      }
      statistics[vote.candidate.id].votes += 1;
    };

    Object.values(statistics).forEach((stat: { percentage: number, votes: number }) => {
      stat.percentage = (stat.votes * 100) / votes.length;
    });
    return {
      data: Object.values(statistics),
      totalVotes: votes.length

    }
  }

  async isValidVote(
    voterId: number,
    candidateId: number,
    transactionalEntityManager: EntityManager,
  ): Promise<{ voter: VoterTypeOrm; candidate: CandidateTypeOrm }> {
    const voter = await transactionalEntityManager.findOneBy(VoterTypeOrm, {
      id: voterId,
    });
    if (!voter) throw new BadRequestException('Invalid Voter ID');
    if (voter.has_voted)
      throw new BadRequestException(
        `Voter with ID ${voterId} has already voted`,
      );

    const candidate = await transactionalEntityManager.findOneBy(
      CandidateTypeOrm,
      { id: candidateId },
    );
    if (!candidate) throw new BadRequestException('Invalid Candidate ID');

    return { voter, candidate };
  }

  async create(vote: CreateVoteDto, voterId: number): Promise<Vote> {
    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const { voter, candidate } = await this.isValidVote(
        voterId,
        vote.candidate_id,
        transactionalEntityManager,
      );

      const newVote = await transactionalEntityManager.save(VoteTypeOrm, {
        candidate,
        voter,
      });

      //Set the has_voted property to true
      voter.has_voted = true;
      await transactionalEntityManager.save(VoterTypeOrm, voter);

      candidate.votes += 1;
      await transactionalEntityManager.save(CandidateTypeOrm, candidate);

      return newVote;
    });
  }
}
