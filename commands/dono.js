require('../global_variables');
require('dotenv').config();
const path = require('path');
const dono = process.env.DONOLYD;
module.exports = {
	name: 'dono',
    description: 'Information about the arguments provided.',
	 execute(message, args) {

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