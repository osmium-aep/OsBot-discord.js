const { Events } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const meme = require('f:/Work space/OS Bot/commands/meme/meme.js')

const messageCounter = new Map();



module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const args = await message.content.slice(2).trim().split(/ +/);
        const command = await args.shift().toLowerCase();
        // const array = ['meme', 'auto', '<#1166081618985893949>'];

        try {


            if (!message.author.bot && message.guild) {
                const guildId = message.guild.id;

                // Initialize the counter for the guild if it doesn't exist
                if (!messageCounter.has(guildId)) {
                    messageCounter.set(guildId, 0);
                }

                // Increment the message count for the guild
                messageCounter.set(guildId, messageCounter.get(guildId) + 1);

                // Check if the threshold is reached (e.g., 100 messages)
                const threshold = 38;
                if (messageCounter.get(guildId) === threshold) {
                    // Reset the counter
                    messageCounter.set(guildId, 0);

                    // Send a message when the threshold is reached
                    meme.execute(message);

                    // message.channel.send(`Congratulations! You reached ${threshold} messages!`);
                }
            }


            // Extracting channel ID from the third element
            // const thirdElement = args[2];
            // const channelIdMatch = thirdElement.match(/<#(\d+)>/);

            // // Check if there's a match and extract the channel ID
            // if (!channelIdMatch) {
            //     throw new Error('No channel mention found in the third element.');
            // }

            // const channelID = channelIdMatch[1];
            // console.log(`Channel ID: ${channelID}`);


        } catch (error) {
            console.error(`Error: ${error.message}`);
            message.channel.send(`Error: ${error.message}`);
        }

    }
}
