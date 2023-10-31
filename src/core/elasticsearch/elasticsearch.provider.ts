import { ELASTIC_SEARCH } from "../constants";
import { SearchService } from "./elasticsearch.service";

export const elasticSearchProvider = [
    {
        provide: ELASTIC_SEARCH,
        useFactory: ()=>{
            
        }
    }
]