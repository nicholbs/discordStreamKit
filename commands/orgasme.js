const fs = require('fs');
require('dotenv').config();

const path = process.env.REPOPATH;

module.exports = {
	name: 'orgasme',
	description: 'funny orgasme',
    cooldown: 5,
	execute(message, args) {
            // message.channel.send('Funny orgasme yay');
            src = "ressurser/bilder/orgasme.html";
            
    fs.copyFile(src, path, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    })

    }

};