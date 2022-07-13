import Eris from "eris";
import { TypedEmitter as EventEmitter } from "tiny-typed-emitter"
import { collectorData } from "../typings";

export class collectorManager extends EventEmitter{
    client: Eris.Client;
    public constructor(client: Eris.Client){
        super();
        if(!client) throw new Error("You didn't passed any client to the collectorManager class");
        this.client = client;        
    }

    public createMessageCollector(collector: collectorData){

    }

}