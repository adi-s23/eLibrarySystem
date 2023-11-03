import { Module } from "@nestjs/common";
import { UserConsumer } from "../worker/user.consumer";
import { ElasticSearch } from "../elasticsearch/elasticsearch.module";

import { BOOK_QUEUE, USER_QUEUE } from "../constants";
import { QueueService } from "./queue.service";
import { queueProvider } from "./queue.provider";

@Module({
    imports: [
    ],
    providers: [...queueProvider],
    exports: [...queueProvider]
})
export class QueueModule{

}