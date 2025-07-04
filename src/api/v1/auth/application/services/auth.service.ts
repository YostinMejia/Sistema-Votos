import { Injectable } from '@nestjs/common';
import { VoterService } from '../../../voter/application/services/voter.service';
import { JwtService } from '@nestjs/jwt';
import { Voter } from 'src/api/v1/voter/domain/voter.interface';

@Injectable()
export class AuthService {
  constructor(
    private voterService: VoterService,
    private jwtService: JwtService,
  ) {}

  async validateVoter(name: string, email: string): Promise<Voter | null> {
    const voter = await this.voterService.findByName(name);
    if (voter && voter.email === email) {
      return voter;
    }
    return null;
  }

  login(voter: Voter) {
    const payload = { username: voter.name, email: voter.email, sub: voter.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
