
import { Injectable } from "@nestjs/common";
import { BOOK_QUEUE, USER_QUEUE } from "../constants";
import { Queue } from "bullmq";


@Injectable()
export class QueueService {

    private userQueue: Queue;
    private bookQueue: Queue;
    constructor(
    ) {
        this.bookQueue = new Queue(BOOK_QUEUE);
        this.userQueue = new Queue(USER_QUEUE);
    }

    async addJobToQueue(queueName,jobName, payload):Promise<void> {
        try {
            
            switch(queueName){
                case(USER_QUEUE):
                    await this.userQueue.add(jobName,payload);
                    break;
                case(BOOK_QUEUE):
                    await this.bookQueue.add(jobName,payload);
                    break;
            }

        } catch (error) {
            throw error;
        }
    }

    async addJobToQueueWithDelay(queueName: string,jobName: string, payload: any,delay: number):Promise<void> {
        try {
            
            switch(queueName){
                case(USER_QUEUE):
                    await this.userQueue.add(jobName,payload,{
                        delay: delay
                    });
                    break;
                case(BOOK_QUEUE):
                    await this.bookQueue.add(jobName,payload,{
                        delay: delay
                    });
                    break;
            }

        } catch (error) {
            throw error;
        }
    }







}