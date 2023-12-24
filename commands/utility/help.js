module.exports = {
    name:'help',
    async execute(message){
        message.channel.send(`\`ping:: To make sure The bot is alive or dead. //syntax: os ping\nafk(NOT READY YET):: if on, Whenever someone mention you They will get notified with a message.. and You will recieve a Dm from me. //syntax: os afk [on | off]\``)
    }
}