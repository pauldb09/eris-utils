const Eris = require("eris")
const { collectorManager } = require("eris-utilities");
console.log()
const client = new Eris("ODEyMDIyNDM3ODk4MDkyNjA0.GsHSRT.Zs62DsfZveB5UIRKIa6OicuRiQFQdWuIK0GKmE", {
    intents: ["guilds", "guildMessages"]
});

// extendClient(client) OR:
client.collectors = new collectorManager(client)
console.log(client.collectors)
console.log(client.collectors.collectors)
client.on("messageCreate", message => {
    message.channel.createMessage("Answer with pong to interact!")

    if (message.content === "ping") {
        const collector = client.collectors.createMessageCollector({
            channelId: message.channel.id,
            userId: message.member.id,
            time: 6000,
            filter: (msg) => msg.content === "pong",
        })

        collector.on("answer", msg => {
            message.channel.createMessage(`${msg.content}  collected!!!`)
        })
    }
})

client.connect()