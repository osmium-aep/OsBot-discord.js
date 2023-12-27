const { Events } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');


let prefix = 'os';
module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        console.log(`${message.guild.name}/${message.author.username}: ${message}`)
        messageArray = Array.from(message.content);
        if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
        const args = await message.content.slice(prefix.length).trim().split(/ +/);
        const command = await args.shift().toLowerCase();


        const dir = 'F:/Work space/OS Bot/'
        const events = path.win32.normalize(dir);
        const foldersPath = path.join(events, 'commands');
        const commandFolders = fs.readdirSync(foldersPath);

        for (folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            for (file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const cmd = require(filePath);
                // console.log(cmd);
                // if (cmd.name != command && messageArray[2] == ' ') {message.channel.send('UnKnown Command! use \`os help\` for more command info.'); return;}
                    if (cmd.name == command && messageArray[2] == ' ') {
                        await cmd.execute(message);
                        console.log("cmd.name == command")
                        break;
                    }
            }
        }
    },
};
