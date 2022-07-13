import { TypedEmitter as EventEmitter } from "tiny-typed-emitter"
import { collectorCreateData, collectorData } from "../typings";
import { generateId } from "../utils/id";
import { collectorManager } from "./manager";

export class Collector extends EventEmitter {
    public channelId: string;
    public userId?: string | null;
    public answers: Array<String>;
    public ended: boolean;
    public time: number;
    public readonly collectorId: string;
    private readonly manager: collectorManager
    private filter: (m: any) => any;
    public readonly type: "INTERACTION" | "MESSAGE" | undefined;

    public constructor(data: collectorCreateData, manager: collectorManager) {
        super();
        this.channelId = data.channelId;
        this.userId = data.userId ?? null;
        this.collectorId = generateId(10);
        this.answers = [];
        this.ended = false;
        this.time = data.time;
        this.type = data.type;

        this.manager = manager;
    }

    /**
    * Ends a collector and triggers the end event
    * @returns {void}
    */
    public end() {
        this.emit("end", this)
        this.manager.deleteCollector(this);
        return this;
    }
}