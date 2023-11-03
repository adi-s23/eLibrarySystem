import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { BookModule } from "src/book/book.module";
import { CartModule } from "src/cart/cart.module";
import { Eventlisteners } from "./events.listeners";
import { TransactionModule } from "src/transaction/transaction.module";


@Module({
    imports:[
        EventEmitterModule.forRoot(),BookModule,TransactionModule],
    exports:[],
    providers: [Eventlisteners]
})
export class EventsModule{

}