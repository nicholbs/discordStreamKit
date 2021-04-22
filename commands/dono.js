require('../global_variables');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const dono = process.env.DONOLYD;
var donation = require('../index');
module.exports = {
	name: 'dono',
    description: 'Information about the arguments provided.',
	 execute(message, args) {
        args = Number(args)
        var isValid = isNaN(args)
        if (typeof args === 'number' && !isValid) {
            fs.readFile(__dirname+ '/../ressurser/bilder/donation.html', 'utf8', (err, data) => {
                if (err) throw err;
                // console.log("donation for: " + donation.donationCurrent)
     
                    donation.donationCurrent= args + donation.donationCurrent;
                    var nyInnhold = data.replace('replaceMeFirst', donation.donationCurrent);
                    
                    var prosent = donation.donationCurrent / donation.donationGoal * 100
                    if (prosent < 0) {
                        prosent = 0;
                    }
                    // console.log("donation etter: " + donation.donationCurrent)
                    
                    nyInnhold = nyInnhold.replace('replaceMeSecond', prosent);
                    fs.writeFile(__dirname+ '/../ressurser/donation.html', nyInnhold, (errTre) => {
                        if (errTre) throw errTre;
                    });
                });
            }
            const { voice } = message.member
        if (!voice.channelID) {
            message.reply('You must be in a voice channel')
            return
        }

        voice.channel.join().then((connection) => {
            connection.play(path.join(__dirname + '/../ressurser/lyder/', dono));
            
        })
    },
};

// Putt denne i index.js istedenfor slik at du kan holde på dispatcher objectet og kalle på end dersom noen sier stop.