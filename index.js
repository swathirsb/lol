require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const prefix = '/';

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commands = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));
for (const file of commands) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('message', async message => {
    if(message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
            || client.commands.find(command => command.aliases && command.aliases.includes(commandName));

    if(!command) return message.reply(`\`${commandName}\` is not a vaild command`);

    try {
        command.run(client, message, args);
    }catch(error) {
        message.reply(`There was an error!`)
        console.log(error);
    }
})

client.on('ready', () => {
    commands.forEach(command => {
        console.log(`${command} is loaded!`)
    });
    console.log(`${client.user.username} was logged!`)
    client.user.setActivity(`${prefix}minecraft`, { type: 'WATCHING' })
});

client.login(process.env.TOKEN)