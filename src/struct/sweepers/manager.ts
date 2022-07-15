import Eris = require("eris");
import { set } from "husky";
import { sweeperManagerOptions } from "../typings";

export class SweeperManager {
    client: Eris.Client;
    options: sweeperManagerOptions;
    sweepable: Array<any>

    public constructor(client: Eris.Client, options: sweeperManagerOptions) {
        this.client = client;
        this.options = options;
        this.sweepable = [];
        this._setup()
    }

    private _setup() {
        // validate for channels
        const channels = this.options.channels
        if (channels) {
            if (!channels.delay || channels.delay == 0) throw new Error("You didn't provided a delay for the sweep of channels or it's invalid.");

            if (channels.clearCategories || channels.clearDms || channels.clearTextChannels || channels.clearThreads || channels.clearVoiceChannels) {
                if (channels.filter) {
                    this.sweepable.push({ name: "channels", filter: channels.filter })
                } else {
                    this.sweepable.push({ name: "channels", settings: channels })
                }
            } else {
                if (!channels.filter) throw new Error("You need to provide a filter or one of options.");

                this.sweepable.push({ name: "channels", filter: channels.filter })
            }
        }

        // Validate guildMembers

        const members = this.options.members;
        if (members) {
            if (!members.delay || members.delay == 0) throw new Error("You didn't provided a delay for the sweep of members or it's invalid.");

            if (members.excludeClient || members.excluteInVoice) {
                if (members.filter) {
                    this.sweepable.push({ name: "members", filter: members.filter })
                } else {
                    this.sweepable.push({ name: "members", settings: members })
                }
            } else {
                if (!members.filter) throw new Error("You need to provide a filter or one of options.");

                this.sweepable.push({ name: "members", filter: members.filter })
            }
        }
    }

    private _baseSweep(func: (m) => any) {
        return this.client.guilds.forEach(element => {
            func(element)
        });
    }

    public sweepChannels(settings) {

        return this._baseSweep(guild => {
            if (typeof (settings) === "function") {
                guild.channels = guild.channels.filter(chan => settings(chan))
            } else {
                if (settings.clearCategories) guild.channels = guild.channels.filter(chan => chan?.type !== Eris.Constants.ChannelTypes.GUILD_CATEGORY)
                if (settings.clearTextChannels) guild.channels = guild.channels.filter(chan => chan?.type !== Eris.Constants.ChannelTypes.GUILD_TEXT)
                if (settings.clearThreads) guild.channels = guild.channels.filter(chan => chan?.type !== Eris.Constants.ChannelTypes.GUILD_PUBLIC_THREAD)
                if (settings.clearVoiceChannels) guild.channels = guild.channels.filter(chan => chan?.type !== Eris.Constants.ChannelTypes.GUILD_VOICE)
            }
        })

    }

    sweep() {
        for (const toSweep of this.sweepable) {
            switch (toSweep.name) {
                case "channels":

                    break;
                case "members":

                    break
                default:
                    break;
            }
        }
    }
}