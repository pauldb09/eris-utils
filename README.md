# eris-utils

Adds collectors, sweepers and some other things to eris

**Getting Started**

Start by downloading the package from npm using the command line:

```
npm install eris-utils@latest

```

Then you can use it on your own bot, here it a little example with javascript:

**Create Message collectors**

```js

const Eris = require("eris")
const { CollectorManager, SweeperManager, extendClient } = require("eris-utils")

const client = new Eris("BOT_TOKEN",{
    intents: ["guilds"]
});

// extendClient(client) OR:
client.collectors = new CollectorManager(client);

client.on("interactionCreate", interaction=>{
    if(interaction.data.name === "ping"){
        const collector = client.collectors.createMessageComponentsCollector({
             channelId: string;
                userId?: string;
                 collectorId: string;
            answers: Array<string>
            ended: boolean;
            time: number;
                filter: (m: any) => any;
        })
    }
})

client.connect()
```

**Sweepers**

```js

const Eris = require("eris")
const { SweeperManager } = require("eris-utils")

const client = new Eris("YOUR_TOKEN", {
    intents: ["guildMessages"]
});

client.collectors = new CollectorManager(client);
client.sweepers = new SweeperManager(client, {
    members: {
        delay: 1000*60*60,
        // excludeClient: true,
        // excluteInVoice: true,
        // If filter is passed, excluteInVoice and excludeClient will both be ignored

        // Just an example
        filter: (m)=> m.guild.id !== "XX";
    },
    channels: {
        delay: 1000*60*60;
        filter: (m) => m;
    }
})

client.connect()
```