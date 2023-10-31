import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RedisModule } from 'src/core/redis/redis.module';

@Module({
    imports: [PassportModule, forwardRef(()=>UserModule), JwtModule.register({
        secret: process.env.KEY,
        signOptions: { expiresIn: '1h'}
    }),RedisModule],
    providers: [AuthService, JwtStrategy,],
    controllers: [],
    exports:[AuthService]
})
export class AuthModule {

}
