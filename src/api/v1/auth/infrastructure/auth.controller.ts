import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../application/guards/local-auth.guard';
import { AuthService } from '../application/services/auth.service';
import { Voter } from '../../voter/domain/voter.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: Voter }) {
    return this.authService.login(req.user);
  }
}
