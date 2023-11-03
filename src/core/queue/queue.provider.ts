import { BULLMQ } from "../constants";
import { QueueService } from "./queue.service";

export const queueProvider = [{
    provide: BULLMQ,
    useFactory: () => {
        try {
            const queueService = new QueueService();
            return queueService;
        }
        catch (err) {
            throw err;
        }
    }
}]