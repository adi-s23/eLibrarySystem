import { Worker } from "bullmq";
import { SearchService } from "../elasticsearch/elasticsearch.service";
import { ADD_USER, USER_QUEUE } from "../constants";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class UserConsumer {
    private userWorker;
    constructor(private searchService: SearchService) {
        this.userJob;
        this.createUserWorker();
    }


    createUserWorker() {
        try {
            this.userWorker = new Worker(USER_QUEUE, this.userJob);
        } catch (err) {
            throw err;
        }
    }

    userJob = async (job) => {
        try {
            switch (job.name) {
                case (ADD_USER):
                    console.log(job.data)
                    await this.searchService.createUser(job.data);
                    break;
            }
        } catch (err) {
            throw err;
        }
    }
}