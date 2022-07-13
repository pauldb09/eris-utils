import { collectorManager } from "../collectors/manager";
import { collectorData } from "../typings";
const Eris = require("eris")

export function extend(client: any) {

    client.collectors = new collectorManager(client);

    Eris.GuildChannel.prototype.createMessageCollector = async function (collector: collectorData) {
        return client.collectors.createMessageCollector(collector, client.collectors)

    }
    Eris.GuildChannel.prototype.createMessageComponentsCollector = async function (collector: collectorData) {
        return client.collectors.createMessageComponentsCollector(collector, client.collectors)

    }

    client.on("messageCreate", m => client.collectors.handle(m))
    client.on("interactionCreate", m => client.collectors.handle(m))


    return client.collectors;

}