import Eris = require("eris");
import { TypedEmitter as EventEmitter } from "tiny-typed-emitter"
import { Collector } from "../collectors/collector";

export interface collectorData extends EventEmitter {
    channelId: string;
    userId?: string;
    maxAnswers: number;
    startMessage: string;
    time: number;
    filter: (m: any) => any;
}

export interface collectorCreateData extends EventEmitter {
    channelId: string;
    userId?: string;
    collectorId?: string;
    maxAnswers: number;
    startMessage: string;
    ended?: boolean;
    time: number;
    type?: "INTERACTION" | "MESSAGE"
    filter: (m: any) => any;
}

export interface collectorManagerEvents {
    collectorCreate: (collector: Collector, client) => any;
    collectorEnded: (reason: "TIME" | "USER" | "MAX_ANSWERS", collector: Collector, client) => any;
    collectorAnswer: (collector: Collector, client) => any;
    collectorInvalidAnswer: (collector: Collector, client) => any;

}

export interface collectorEvents {
    end: (reason: "TIME" | "USER" | "MAX_ANSWERS", collector: Collector) => any;
    response: (res: any) => any
}

export interface sweeperManagerOptions {
    members?: {
        delay: number,
        excludeClient?: boolean,
        excluteInVoice?: boolean,
        filter?: (m: Eris.Member) => any;
    },
    channels?: {
        delay: number,
        clearCategories?: boolean,
        clearVoiceChannels?: boolean,
        clearThreads?: boolean,
        clearTextChannels?: boolean,
        clearDms?: boolean;
        filter?: (m: Eris.AnyChannel) => any;
    },
    roles: {
        delay: number,
        filter: (m: Eris.Role) => any;
    },
    guildStickers: {
        delay: number;
    },
    guildEmojis: {
        delay: number;
    }
}