import { collectorManager } from "../collectors/manager";
import { collectorData } from "../typings";
const Eris = require("eris")

export function extend(client: any)
{

    client.collectors = new collectorManager(client);

    Eris.GuildChannel.prototype.createMessageCollector = async function (collector: collectorData) {
        return client.collectors.createMessageCollector(collector)
        
    }
    Eris.GuildChannel.prototype.createMessageComponentsCollector = async function (collector: collectorData) {
        return client.collectors.createMessageComponentsCollector(collector)
        
    }

    return client.collectors;

}