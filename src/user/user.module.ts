import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './core/user.service';
import { UserController } from './core/user.controller';
import { UserRepository } from './core/user.repository';
import { databaseProviders } from 'src/core/database/database.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(()=> AuthModule)],
  providers: [UserService,UserRepository,...databaseProviders],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
