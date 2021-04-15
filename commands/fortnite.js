const fs = require('fs');
require('dotenv').config();
const path = process.env.REPOPATH;

module.exports = {
	name: 'fortnite',
	description: 'funny fortnite',
	execute(message, args) {
            message.channel.send('Funny Fortnite yay');
            src = "ressurser/bilder/fortnite.html";
            
    fs.copyFile(src, path, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    })

    }

};