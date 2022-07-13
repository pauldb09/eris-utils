import { TypedEmitter as EventEmitter } from "tiny-typed-emitter"
import { collectorCreateData } from "../typings";
import { generateId } from "../utils/id";

export class Collector extends EventEmitter {
    public channelId: string;
    public userId?: string | null;
    public answers: Array<String>;
    public ended: boolean;
    public time: number;
    private collectorId: string;
    private filter: (m: any) => any;
    private type: "BUTTON" | "MESSAGE";

    public constructor(data: collectorCreateData) {
        super();
        this.channelId = data.channelId;
        this.userId = data.userId ?? null;
        this.collectorId = generateId(10);
        this.answers = [];
        this.ended = false;
        this.time = data.time;
        this.type = data.type;

    }

    /**
   * Ends the collector and triggers the end event. Use .destroy() if you don't want to trigger it
   * @returns 
   */
    public end() {

    }
}