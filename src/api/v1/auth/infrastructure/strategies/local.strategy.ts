
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { Voter } from 'src/api/v1/voter/domain/voter.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({passwordField:"email"});
  }

  async validate(username: string, email: string): Promise<Voter> {
    const voter = await this.authService.validateVoter(username, email);
    if (!voter) {
      throw new UnauthorizedException();
    }
    return voter;
  }
}
