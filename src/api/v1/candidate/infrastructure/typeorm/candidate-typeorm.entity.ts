import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Candidate } from '../../domain/candidate.interface';

@Entity('candidate')
export class CandidateTypeOrm implements Candidate {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  party: string;
  @Column({ default: 0 })
  votes: number;
}
