const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Now, Logged In As ${client.user.tag}`);
        client.user.setPresence({ activities: [{ name: 'with depression ☕' }], status: 'dnd'});
    },

};