const Eris = require("eris")
const util = require("eris-utilities");
console.log()
const client = new Eris("ODEyMDIyNDM3ODk4MDkyNjA0.GXQvCj.gHn7wlvAB9QGMxrjNZ7wLaGe0zH90UM4hnbv7c", {
    intents: ["guilds", "guildMessages"]
});

// extendClient(client) OR:
client.collectors = new util.default.collectorManager(client)

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