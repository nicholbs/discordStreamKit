require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const discordTTS=require("discord-tts");
const { serverID } = require('./global_variables');
const client = new Discord.Client();
const klient = new Discord.Client();
const TOKEN = process.env.TOKEN;
const TOKEN2 = process.env.TOKEN2;
const prefix = process.env.PREFIX;


var donationCurrent = 0;
var donationGoal = 10000;

module.exports = {
    donationCurrent,
    donationGoal
}
client.on('ready', () => {
    console.info(`client Logged in as ${client.user.tag}!`);
    client.channels.cache.get(serverID);
    // console.log(serverID);
});
  
// Client ChatBot
client.login(TOKEN);

// Klient guttaGangBang
klient.login(TOKEN2);

klient.on('ready', () => {
    console.info(`klient Logged in as ${klient.user.tag}!`);
    klient.channels.cache.get(serverID);
});
  
klient.on('message', message => {
    console.log("Klient Nå kom en melding: " + message)
    if (!message.content.startsWith(prefix)){
        return;
    } 

	const args = message.content.slice(prefix.length).trim().split(/ +/);

    if (message.content.includes("dono")){
        const broadcast = client.voice.createBroadcast();
        var channelId=message.member.voice.channelID;
        var channel=klient.channels.cache.get(channelId);
        channel.join().then(connection => {
            broadcast.play(discordTTS.getVoiceStream("Thanks for " + args +" cash money"));
            const dispatcher=connection.play(broadcast);
        })
    }    
        
});





/***************************************************************************************
 * Discord.js comes with this utility class known as Collection.
 * It extends JavaScript's native Map class, so it has all the features of Map and more!
 * 
 * @author nicholbs
 * @see https://discordjs.guide/additional-info/collections.html
 **************************************************************************************/
 client.commands = new Discord.Collection();


/***************************************************
 * Array of names for files inside 'commands' folder
 * 
 * All commands available for the user to interact 
 * with the music bot has a file which contains
 * all of the relaled javascript. 
 * The constant 'commandFiles' holds the name of
 * all such command files.
 * 
 * Is read at initialization of application
 * and the bot can be made to listen for all
 * messages that contains the specified commands.
 * 
 * @author nicholbs
 * @constant commandFiles
 **************************************************/
 const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));  

 /***************************************************
  * Reads all commands inside the 'commands' folder
  * 
  * @author nicholbs
  * @see Definition - @constant commandFiles
  **************************************************/
 for (const file of commandFiles) {
   const command = require(`./commands/${file}`);
 
   // set a new item in the Collection
   // with the key as the command name and the value as the exported module
   client.commands.set(command.name, command);
 }


/*********************************************
 * Continually check if messages in server
 * contains any of the bot's commands 
 * 
 * @author nicholbs 
 ********************************************/
client.on('message', message => {
    console.log("Nå kom en melding: " + message)
    if (!message.content.startsWith(prefix)){
        return;
    } 
    // || message.author.bot)       //Legg på denne dersom det er ønskelig at robot ikke skal reagere på egne meldinger

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) { 
    return message.reply('that\'s not a valid command!');
    }


    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }


    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
        	reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        	}
        
        	return message.channel.send(reply);
            }


        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }

});