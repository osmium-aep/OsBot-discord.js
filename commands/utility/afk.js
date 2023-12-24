const afk = require("F:/Work space/OS Bot/index.js");

const prefix = 'os'
module.exports = {
    name: 'afk',
    async execute(message) {
        const args = await message.content.slice(prefix.length).trim().split(/ +/);
        // console.log(args);
        if (args[1].toLowerCase() == 'on') {
            if (!afk.isAfk(message.author.id)) {
                await afk.addAfk(message.author.id, message.author.username, 'TRUE');
                message.channel.send("afk(away from keyboard) Status: On");
                return;
            }
            message.channel.send("afk(away from keyboard) Status: On");

        } else if (args[1].toLowerCase() == 'off') {
            if (afk.isAfk(message.author.id)) {
                await afk.addAfk(message.author.id, message.author.username, 'FALSE');
                message.channel.send("afk(away from keyboard) Status: Off");
                return;
            }
            message.channel.send("afk(away from keyboard) Status: Off");

        }
    }
}