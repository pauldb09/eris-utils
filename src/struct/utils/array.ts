import { Collector } from "../collectors/collector";

export class ExtendedArray<T = any> extends Array{

    public constructor(...entries: Array<any>){
        super();
        this.push(...entries)
    }

    remove(value: any){
        return this.filter(function(e){ 
            return e != value; 
        });
    }

    add(values:  Collector | Array<Collector>){
        return this.push(values)
    }
}