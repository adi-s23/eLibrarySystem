import { ELASTIC_SEARCH } from "../constants";
import { SearchService } from "./elasticsearch.service";

export const elasticSearchProvider = [
    {
        provide: ELASTIC_SEARCH,
        useFactory: ()=>{
            try{
                // const searchService = new SearchService();
                // return searchService;
            }catch(err){
                throw err;
            }
        }
    }
]