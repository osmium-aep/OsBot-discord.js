module.exports = {
    name: 'invite',
    async execute(message) {
        message.channel.send(`You Can Invite Me to your server by This Link: https://discord.com/api/oauth2/authorize?client_id=1149348009725927494&permissions=843961203776&scope=bot`);
    }
}