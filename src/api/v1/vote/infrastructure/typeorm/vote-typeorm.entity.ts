import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { VoterTypeOrm } from 'src/api/v1/voter/infrastructure/typeorm/voter-typeorm.entity';
import { CandidateTypeOrm } from 'src/api/v1/candidate/infrastructure/typeorm/candidate-typeorm.entity';

@Entity({ name: 'vote' })
export class VoteTypeOrm {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Index({ unique: true })
  @OneToOne(() => VoterTypeOrm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'voter_id' })
  voter: VoterTypeOrm;
  @ManyToOne(() => CandidateTypeOrm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: CandidateTypeOrm;

  @RelationId((vote: VoteTypeOrm) => vote.candidate)
  candidate_id: number;
  @RelationId((vote: VoteTypeOrm) => vote.voter)
  voter_id: number;
}
