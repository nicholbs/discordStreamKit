require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const prefix = process.env.PREFIX;
const path = process.env.PATH;
 
client.login(TOKEN);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});


/***************************************************************************************
 * Discord.js comes with this utility class known as Collection.
 * It extends JavaScript's native Map class, so it has all the features of Map and more!
 * 
 * @author nicholbs
 * @see https://discordjs.guide/additional-info/collections.html
 **************************************************************************************/
 client.commands = new Discord.Collection();

// bot.on('message', msg => {
//   if (msg.content === 'ping') {
//     msg.reply('pong');
//     msg.channel.send('pong');

//   } else if (msg.content.startsWith('!kick')) {
//     if (msg.mentions.users.size) {
//       const taggedUser = msg.mentions.users.first();
//       msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
//     } else {
//       msg.reply('Please tag a valid user!');
//     }
//   }
// });

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