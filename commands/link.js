const fs = require('fs');
require('dotenv').config();

const path = process.env.REPOPATH;

function endreFil(args) {
    src = "ressurser/bilder/link.html";
    var filsti = process.env.REPOPATH;
    fs.readFile(filsti, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log("Du er i link")
        console.log("args: " + args)
        var result = data.replace("replaceMe", args);
        console.log("result: " + result);

        fs.writeFile(filsti, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

module.exports = {
	name: 'link',
	description: 'funny link',
    cooldown: 5,
	execute(message, args) {
            // message.channel.send('Funny orgasme yay');
            src = "ressurser/bilder/link.html";
    //   async function run() {}    
    fs.copyFile(src, path, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            endreFil(args);
        }
    })
     
    }
};

