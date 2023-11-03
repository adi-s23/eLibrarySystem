import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './core/user.service';
import { UserController } from './core/user.controller';
import { UserRepository } from './core/user.repository';
import { databaseProviders } from 'src/core/database/database.provider';
import { AuthModule } from 'src/auth/auth.module';
import { ElasticSearch } from 'src/core/elasticsearch/elasticsearch.module';
import { QueueModule } from 'src/core/queue/queue.module';
import { UserConsumer } from 'src/core/worker/user.consumer';
import { SearchService } from 'src/core/elasticsearch/elasticsearch.service';
import { QueueService } from 'src/core/queue/queue.service';

@Module({
  imports: [forwardRef(()=> AuthModule),QueueModule, ElasticSearch],
  providers: [UserService,UserRepository,...databaseProviders, UserConsumer],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {
  
}
