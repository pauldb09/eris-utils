const Eris = require("eris")
const { collectorManager } = require("eris-utilities");
console.log()
const client = new Eris("ODEyMDIyNDM3ODk4MDkyNjA0.GdHMyQ.RZgPXLX0CmgR8cwQdfayeS3kpfUYyjcnm8uaDE", {
    intents: ["guilds", "guildMessages"]
});

client.on("messageCreate", message => {
    if (message.author.bot) return console.log("bot");
    message.channel.createMessage("Answer with pong to interact!")

    const collector = client.collectors.createMessageCollector({
        channelId: message.channel.id,
        userId: message.member.id,
        time: 6000,
        filter: (msg) => msg.content === "pong",
    })

    collector.on("answer", msg => {
        message.channel.createMessage(`${msg.content}  collected!!!`)
    })

})

// extendClient(client) OR:
client.collectors = new collectorManager(client)
client.on("error", console.log)


client.connect()