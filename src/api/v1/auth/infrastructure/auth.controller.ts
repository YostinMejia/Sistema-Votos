import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../application/guards/local-auth.guard";
import { JwtAuthGuard } from "../application/guards/jwt-auth.guard";
import { AuthService } from "../application/services/auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

}
