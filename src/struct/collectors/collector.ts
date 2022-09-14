import { TypedEmitter as EventEmitter } from "tiny-typed-emitter"
import { collectorCreateData, collectorData, collectorEvents } from "../typings";
import { generateId } from "../utils/id";
import { collectorManager } from "./manager";

export class Collector extends EventEmitter<collectorEvents>{
    public channelId: string;
    public userId?: string | null;
    public startMessage: string;
    public maxAnswers: number;
    public answers: Array<String>;
    public ended: boolean;
    public time: number;
    public readonly collectorId: string;
    private readonly manager: collectorManager
    public filter: (m: any) => any;
    public readonly type: "INTERACTION" | "MESSAGE" | undefined;
    private readonly timeout: ReturnType<typeof setTimeout>;

    public constructor(data: collectorCreateData, manager: collectorManager) {
        super();
        this.channelId = data.channelId;
        this.userId = data.userId ?? null;
        this.filter = data.filter;
        this.collectorId = generateId(10);
        this.answers = [];
        this.ended = false;
        this.maxAnswers = data.maxAnswers;
        this.startMessage = data.startMessage;
        this.time = data.time;
        this.type = data.type;

        this.manager = manager;
        this.timeout = setTimeout(() => {
            this.end("TIME")
        }, this.time)
    }

    /**
    * Ends a collector and triggers the end event
    * @returns {void}
    */
    public end(reason) {
        if(!reason || !["TIME" , "USER" ,"MAX_ANSWERS"].includes(reason)) reason = "USER"
        clearTimeout(this.timeout)
        this.emit("end", reason, this);
        this.manager.emit("collectorEnded", reason, this, this.manager.client)
        this.manager.deleteCollector(this);
        return this;
    }
}
