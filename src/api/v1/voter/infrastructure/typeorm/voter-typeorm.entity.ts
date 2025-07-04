import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Voter } from '../../domain/voter.interface';

@Entity({ name: 'voter' })
export class VoterTypeOrm implements Voter {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ default: false })
  has_voted: boolean;
}
