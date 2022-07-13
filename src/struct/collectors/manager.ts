import Eris from "eris";
import { TypedEmitter as EventEmitter } from "tiny-typed-emitter"
import { collectorData } from "../typings";
import { Collector } from "./collector";

export class collectorManager extends EventEmitter{
    client: Eris.Client;
    collectors: Array<Collector>
    public constructor(client: Eris.Client){
        super();
        if(!client) throw new Error("You didn't passed any client to the collectorManager class");
        this.client = client;      
        this.collectors = [];  
    }

    private _validateOptions(options: collectorData){
        if(!options || typeof(options) !== "object") throw new Error("The options provided to create the collector are missing or are not an object");
        
    }

    public deleteCollector(collector: string | Collector){
        if(!collector || typeof(collector) !== "string" && typeof(collector) !== "object")  throw new Error("You need to provide a string or collector to deleteCollector");
        
    }

    public createMessageCollector(collector: collectorData){

    }

}

