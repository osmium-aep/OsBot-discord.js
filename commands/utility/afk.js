const db = require("F:/Work space/OS Bot/index.js");

const prefix = 'os'
module.exports = {
    name: 'afk',
    async execute(message) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const userId = message.author.id;
        const username = message.author.username;
        const bool = args[1];
        
        
        if (args[0] == 'afk') {
            try {
                const databaseCheck = await db.databaseCheck(userId);
                if (!databaseCheck) {
                    await db.addAfk(userId, username, 'FALSE');
                }
                
                if(args[1] == undefined){
                    message.channel.send('UnKnown Command! use \`os help\` for more command info.');
                    return;
                }
                if (bool.toLowerCase() == 'on') {
                    const isAfk = await db.isAfk(userId);
                    if (!isAfk) {
                        await db.updateAfk(userId, 'TRUE');
                        message.channel.send("isAfk Status Updated To 'On'");
                    }
                    message.channel.send(`<@${userId}> isAfk Status: On`);
                } else if (bool.toLowerCase() == 'off') {
                    const isAfk = await db.isAfk(userId);
                    if (isAfk) {
                        await db.updateAfk(userId, 'FALSE');
                        message.channel.send("isAfk Status Updated To 'Off'");
                    }
                    message.channel.send(`<@${userId}> isAfk Status: Off`);
                }
            } catch (error) {
                console.error(error);
                message.channel.send('An Error occurred in Afk command Send message to <@808318773257437216> immediately')
                // Handle the error appropriately
            }
        }


        // }
        // // let addAfk = db.addAfk(userId, username, bool)
        // if (args[0].toLowerCase() != 'afk') return;
        // await db.databaseCheck()
    }
}