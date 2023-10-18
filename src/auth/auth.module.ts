import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [PassportModule, forwardRef(()=>UserModule), JwtModule.register({
        secret: process.env.KEY,
        signOptions: { expiresIn: '1h'}
    })],
    providers: [AuthService, JwtStrategy,],
    controllers: [],
    exports:[AuthService]
})
export class AuthModule {

}
