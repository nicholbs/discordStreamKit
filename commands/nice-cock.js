const fs = require('fs');
require('dotenv').config();

const path = process.env.REPOPATH;

module.exports = {
	name: 'nice-cock',
	description: 'nice-cock bro',
    cooldown: 5,
	execute(message, args) {
            // message.channel.send('Funny truse yay');
            src = "ressurser/bilder/nice-cock" + ".html";
            
    fs.copyFile(src, path, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    })

    }

};