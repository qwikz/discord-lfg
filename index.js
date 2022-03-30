const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const config = require('./config.json')
const db = require('quick.db')

const client = new Client({ intents: 
[Intents.FLAGS.GUILDS, 
 Intents.FLAGS.GUILD_MESSAGES, 
 Intents.FLAGS.GUILD_MEMBERS, 
 Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
 Intents.FLAGS.DIRECT_MESSAGES, 
 Intents.FLAGS.GUILD_VOICE_STATES, 
 Intents.FLAGS.DIRECT_MESSAGE_REACTIONS], 
 partials: ["CHANNEL", "MESSAGE", "USER"] })

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  
console.log("Bot is ready!")
  
let lfg = db.get(`lfg_${config.guildId}`)  

if(lfg === null){
  
client.user.setActivity(`0 player(s) lfg`, { type: 'WATCHING' });

}
else
{
  
client.user.setActivity(`${lfg} player(s) lfg`, { type: 'WATCHING' });
  
}
  
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;


	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, config, MessageEmbed, client, db);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);