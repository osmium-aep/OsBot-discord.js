const { Events } = require('discord.js');
const db = require("F:/Work space/OS Bot/index.js");


module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        let userIds = []
        const isafkUsers = await db.isafkUsers();
        for (let i = 0; i < isafkUsers.length; i++) {
            userIds.push(isafkUsers[i].userId)
        }

        function containsUserId() {
            return userIds.find(userId => message.content.includes(`<@${userId}>`));
        }

        const foundUserId = containsUserId();

        function isContainsUserId(){
            return userIds.some(userId => message.content.includes(`<@${containsUserId()}>`));
        }



        if(isContainsUserId() && !message.author.bot){
            message.reply(`<@${containsUserId()}> Is currently AFK.`)

            // message.channel.send(`Triggered! Message: ${message}, User ID: ${foundUserId}`)
        }

    },
};
