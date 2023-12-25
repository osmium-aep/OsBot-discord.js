const { MessageAttachment } = require('discord.js')
const { createCanvas, loadImage } = require('canvas');
const fs = require('node:fs')

module.exports = {
    name: 'meme',
    async execute(message) {
        const args = await message.content.slice(2).trim().split(/ +/);
        message.channel.send('This is a meme');

        async function createMeme(topText, bottomText, imagePath, outputImagePath) {
            // Load the base image
            const image = await loadImage(imagePath);

            // Set canvas dimensions to match the image
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');

            // Draw the image on the canvas
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            // Set text properties
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 5;
            ctx.font = '40px Sans-serif';


            // Draw top text
            ctx.textAlign = 'center';
            ctx.fillText(topText, canvas.width / 2, 50);
            ctx.strokeText(topText, canvas.width / 2, 50);

            // Draw bottom text
            ctx.textAlign = 'center';
            ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
            ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);

            // Save the canvas as an image file
            const out = fs.createWriteStream(outputImagePath);
            const stream = canvas.createPNGStream();
            stream.pipe(out);

            // Wait for the stream to finish writing the image file
            await new Promise((resolve, reject) => {
                out.on('finish', resolve);
                out.on('error', reject);
            });

            // Send the image as a message in Discord
            // message.channel.send({
            //     content: 'Check out this meme:',
            //     files: [outputImagePath],
            // });
            // }


        }


        message.channel.send('args: ' + args)
        // Example usage
        // createMeme(args[1], args[2], 'F:/Work space/OS Bot/commands/meme/rock.png', 'meme.png');
        // message.channel.send({ content: 'Check out this meme:', files: [createMeme('This is', 'RockStar Games', 'F:/Work space/OS Bot/commands/meme/rock.png', 'meme.png')] });

    },
}