const Discord = require('discord.js')

module.exports = {
    name: "ping",
    aliases: ['pong'],
    description: "test command",

    async run (client, message, args) {


        const ping = new Discord.MessageEmbed()
        .setDescription(`🏓\`${Date.now() - message.createdTimestamp}\`ms`);


        message.channel.send(ping);
    }
}