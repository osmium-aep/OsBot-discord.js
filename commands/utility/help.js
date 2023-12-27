module.exports = {
  name: 'help',
  async execute(message) {
    const helpMessage = `

\`\`\`markdown
# Command Help

## Config Commands:


os invite
  Get the invite link for the bot.

  Example:

  os invite


  
## Utility Commands:


os afk [on | off]
  Toggle AFK mode. When on, mentions will trigger a notification, and you'll receive a DM.

  Example:

  os afk on
  os afk off



  os help
  Display this help message.

  Example:

  os help



  os ping
  Check if the bot is alive or dead.

  Example:

  os ping

\`\`\`
        `;

    message.channel.send(helpMessage);
  }
}