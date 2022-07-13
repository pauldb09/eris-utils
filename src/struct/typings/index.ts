import { TypedEmitter as EventEmitter } from "tiny-typed-emitter"
import { Collector } from "../collectors/collector";

export interface collectorData extends EventEmitter {
    channelId: string;
    userId?: string;
    time: number;
    filter: (m: any) => any;
}

export interface collectorCreateData extends EventEmitter {
    channelId: string;
    userId?: string;
    collectorId?: string;
    ended?: boolean;
    time: number;
    type?: "INTERACTION" | "MESSAGE"
    filter: (m: any) => any;
}

export interface collectorManagerEvents {

    collectorCreate: (collector: Collector, client) => any;
    collectorEnded: (collector: Collector, client) => any;
    collectorAnswer: (collector: Collector, client) => any;
    collectorInvalidAnswer: (collector: Collector, client) => any;

}

export interface collectorEvents {

    end: (collector: Collector) => any;
    response: (res: any) => any
}