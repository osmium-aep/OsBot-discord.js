
const fetch = require('node-fetch')
const { MessageAttachment, EmbedBuilder, Attachment } = require('discord.js')
const fs = require('node:fs')

module.exports = {
    name: 'meme',
    async execute(message) {

        const apiUrl = 'https://meme-api.com/gimme/beastboyshub';
        
        // message.channel.send('This is a meme');
        // Using the fetch function
        fetch(apiUrl)
            .then(response => {
                // Check if the request was successful (status code 200)
                if (!response.ok) {
                    message.channel.send(`Network response was not ok, status code: ${response.status}`);
                }

                // Parse the JSON response
                return response.json();
            })
            .then(data => {
                // Handle the data from the API
                try {
                    // const hasEmbedLinksPermission = message.guild.me.permissionsIn(message.channel.id).has(Permissions.FLAGS.EMBED_LINKS)

                    // console.log(message.guild)
                    memeEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle(data.title)
                        .setAuthor({ name: data.author, iconURL: data.preview[0], url: data.postLink })
                        .setImage(data.url)
                        .setTimestamp()
                        .setFooter({ text: `from r/${data.subreddit}` })
                    // message.channel.send({ embeds: [memeEmbed] })
                    // let attachment = new MessageAttachment(data.url);
                    // message.channel.send({content: data.title, files: [attachment]})
                    message.channel.send(`# ${data.title}`)
                    message.channel.send(data.url);
                    message.channel.send(`from r/${data.subreddit}`)
                    console.log(data);
                } catch (err) {
                    console.log(err);
                    message.channel.send(`Error: ${err}`);
                    // message.channel.send('Bot Does Not Have Permissions to send embed in This Channel');
                }
            })
            .catch(error => {
                // Handle errors during the fetch
                console.error('Fetch error:', error);
            });
        const args = await message.content.slice(2).trim().split(/ +/);
    }





}