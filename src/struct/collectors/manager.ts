import { TypedEmitter as EventEmitter } from "tiny-typed-emitter"
import { collectorCreateData, collectorData, collectorManagerEvents } from "../typings";
import { ExtendedArray } from "../utils/array";
import { Collector } from "./collector";

export class collectorManager extends EventEmitter<collectorManagerEvents> {
    client: any;
    collectors: Array<Collector>
    public constructor(client: any) {
        super();
        if (!client) throw new Error("You didn't passed any client to the collectorManager class");
        this.client = client;
        this.collectors = [];

        this.client.on("messageCreate", m => {
            if (m.author.bot) return
            this.handle(m)
        })
        this.client.on("interactionCreate", m => {
            if (m.member && m.member.bot) return
            if (m.user && m.user.bot) return
            this.handle(m)
        })
    }

    private _validateOptions(options: collectorData) {
        if (!options || typeof (options) !== "object") throw new Error("The options provided to create the collector are missing or are not an object");
        return true
    }

    public deleteCollector(collector: string | Collector) {
        if (!collector || typeof (collector) !== "string" && typeof (collector) !== "object") throw new Error("You need to provide a string or collector to deleteCollector");
        const found = this.collectors.find(col => col.collectorId === (typeof (collector) === "string" ? collector : collector.collectorId))
        if (!found) throw new Error("Requested to end a collector that doesn't / no longer exists");
        this.collectors = this.collectors.filter(col=>col.collectorId !== found.collectorId);
        return true;
    }

    public createMessageCollector(collector: collectorData) {
        if (!this._validateOptions(collector)) return;
        (collector as collectorCreateData).type = "MESSAGE";
        const collectorCreated = new Collector(collector, this);
        this.collectors.push(collectorCreated);
        this.emit("collectorCreate", collectorCreated, this.client)
        return collectorCreated;
    }

    public createMessageComponentsCollector(collector: collectorData) {
        if (!this._validateOptions(collector)) return;
        (collector as collectorCreateData).type = "INTERACTION";
        collector.startMessage = null;
        const collectorCreated = new Collector(collector, this);
        this.collectors.push(collectorCreated);
        this.emit("collectorCreate", collectorCreated, this.client)
        return collectorCreated;
    }

    public handle(context: any) {
        let userId = context.member && context.member.id ? context.member.id : context.author && context.author.id ? context.author.id : context.user && context.user.id ? context.user.id : "ERROR";
        if (userId === this.client.user.id) return
        let type = context.version ? "INTERACTION" : "MESSAGE";
        if (userId === "ERROR") throw new Error("Could not resolve an user id for message");
        const list = this.collectors.filter(col => col.channelId === context.channel.id && col.type === type && !col.ended)
        if (list && list.length) {
            for (let col of list) {
                if(col.startMessage && col.startMessage === context.id) return
                if (col.userId && col.userId !== userId) return;
                try {
                    col.filter(context);
                } catch (error) {
                    console.log(error)
                    throw new Error("Your code passed in collector.filter() has an error: " + error + "");
                }
                if (!col.filter(context)) return
                col.emit("response", context);
                this.emit("collectorAnswer", col, this.client)
                col.answers.push(context)
                if ((col.answers.length + 1) == col.maxAnswers) {
                    col.end("MAX_ANSWERS")
                }
            }
        }


    }

}

