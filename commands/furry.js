const fs = require('fs');
require('dotenv').config();

const path = process.env.REPOPATH;

module.exports = {
	name: 'furry',
	description: 'funny truse',
    cooldown: 5,
	execute(message, args) {
            // message.channel.send('Funny truse yay');
            src = "ressurser/bilder/furry" + ".html";
            
    fs.copyFile(src, path, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    })

    }

};