import { Module } from "@nestjs/common";
import { UserConsumer } from "./user.consumer";
import { ElasticSearch } from "../elasticsearch/elasticsearch.module";
import { BookConsumer } from "./book.consumer";
import { CategoryModule } from "src/category/category.module";
import { BookModule } from "src/book/book.module";
import { RedisModule } from "../redis/redis.module";

@Module({
    providers: [UserConsumer, BookConsumer],
    imports:[ElasticSearch, CategoryModule,BookModule, RedisModule]
})
export class ConsumerModule{

}