const fs = require('fs');
require('dotenv').config();

const path = process.env.REPOPATH;

module.exports = {
	name: 'boobies',
	description: 'funny boobies',
    cooldown: 5,
	execute(message, args) {
            // message.channel.send('Funny orgasme yay');
            src = "ressurser/bilder/boobies.html";
            
    fs.copyFile(src, path, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    })

    }

};