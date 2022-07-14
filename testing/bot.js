const Eris = require("eris")
const { collectorManager } = require("eris-utilities");
const client = new Eris("ODEyMDIyNDM3ODk4MDkyNjA0.GdHMyQ.RZgPXLX0CmgR8cwQdfayeS3kpfUYyjcnm8uaDE", {
    intents: ["guilds", "guildMessages"]
});

client.on("messageCreate", message => {
    if (message.author.bot) return console.log("bot");
    if (message.content !== "ping") return
    message.channel.createMessage("Answer with pong to interact!")
    const collector = client.collectors.createMessageCollector({
        channelId: message.channel.id,
        startMessage: message.id,
        maxAnswers: 1,
        time: 16000,
        filter: (msg) => msg,
    })
    console.log(collector.collectorId)
    collector.on("end", reason => {
        message.channel.createMessage(`Collector timed out!`)
    })
    collector.on("response", msg => {
        console.log("d")
        message.channel.createMessage(`${msg.content}  collected!!!`)
    })

})

client.collectors = new collectorManager(client)
client.on("error", console.log)


client.connect()