const Gamedig = require('gamedig');
const Discord = require('discord.js');

module.exports = {
    name: 'mc',
    aliases: 'minecraft',
    description: 'whatever',

    trimArray(arr, maxLen = 32) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	},

    async run(client, message, args) {
        Gamedig.query({ type: 'minecraft', host: 'MinonCrafters.aternos.me'}).then((state) => {
            var players = state.players.map(player => player.name)
            var Version = '1.16.2'
            const mineembed = new Discord.MessageEmbed()
                .setTitle(`${state.name}`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor('RANDOM')
                .addField("**__ServerInfo__**", [
                    `**❯ Server IP:** ${state.connect}`,
                    `**❯ Server Version:** ${Version}`,
                    `**❯ Current Online Players:** ${state.players.length} /\ ${state.maxplayers}`,
                    `\u200b`,
                ])
                .addField(`❯ Current Online Players names [${players.length - 0}]`, players.length < 32 ? players.join("\n ") : players.length > 0 ? client.trimArray(players) : 'None')
                .setTimestamp()
        message.channel.send(mineembed)
        }).catch(error => {
            message.channel.send("server is offline")
            if(error) return message.channel.send(error)
        })
    }
}