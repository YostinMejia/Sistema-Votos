import { Module } from "@nestjs/common";
import { AuthService } from "./application/services/auth.service";
import { VoterModule } from "../voter/voter.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LocalStrategy } from "./infrastructure/strategies/local.strategy";
import { AuthController } from "./infrastructure/auth.controller";
import { JwtStrategy } from "./infrastructure/strategies/jwt.strategy";

@Module(
    {
        imports: [VoterModule, PassportModule,
            JwtModule.registerAsync({
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: parseInt(
                            configService.getOrThrow("JWT_DURATION"),
                        ),
                    },
                }),
                inject: [ConfigService],
            }),
        ],
        providers: [AuthService, LocalStrategy, JwtStrategy],
        exports: [AuthService, LocalStrategy, JwtStrategy],
        controllers:[AuthController]
    }
)
export class AuthModule { }