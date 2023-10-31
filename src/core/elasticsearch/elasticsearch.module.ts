import { Module } from "@nestjs/common";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { SearchService } from "./elasticsearch.service";

@Module({
    imports: [ElasticsearchModule.registerAsync({
        useFactory: () => ({
            node: "https://localhost:9200",
            auth: {
                username: 'elastic',
                password: 'DYXL510x4KJHM64GvbE1'
            },
            tls: { rejectUnauthorized: false }
        })
    })],
    exports: [SearchService],
    providers: [SearchService]
})
export class ElasticSearch {
}