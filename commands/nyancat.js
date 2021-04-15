const fs = require('fs');
require('dotenv').config();

const path = process.env.REPOPATH;

module.exports = {
	name: 'nyancat',
	description: 'funny nyan',
    cooldown: 5,
	execute(message, args) {
            // message.channel.send('Funny runescape yay');
            src = "ressurser/bilder/nyancat.html";
            
    fs.copyFile(src, path, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    })

    }

};