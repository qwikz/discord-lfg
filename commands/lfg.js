const { SlashCommandBuilder } = require('@discordjs/builders');
let configfile = require("../config.json")
let games = configfile.games;

   module.exports = {
     
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Post a LFG')
        .addStringOption(option =>
            option.setName('game')
                .setDescription('What game are you looking for players?')
                .setRequired(true)
                .addChoices(games.map(game => [game, game]), games.map(game => [game, game]))
                .addChoice('Other', 'Other'))
     
            .addStringOption(option =>
            option.setName('description')
                .setDescription('Add in a description to your post (players needed, rank, game details, etc.)')),
     
    async execute(interaction, config, MessageEmbed, client, db, MessageActionRow, MessageButton) {
     
    if(interaction.channel.parentId !== config.category) return interaction.reply({content: "Cannot use command outside LFG channels", ephemeral: true})
      
let channel = await interaction.member.voice.channel

if(!channel) return interaction.reply({content: 'You have to be in a voice channel to use this command', ephemeral: true}).then(msg => interaction.delete)
      
let setup = await db.get(`lfg2_${interaction.member.id}`)

if (setup === true || setup === "true") return interaction.reply({content: "You have already have an active LFG post. To delete the post, run the command `/deletelfg`", ephemeral: true})
      
    let answer = interaction.options.getString('description');
    let vchannel = interaction.member.voice.channel;
    let invite = await interaction.member.voice.channel.createInvite()
    let memberschannel = vchannel.members;
    let link = `${invite}`
      
  if(!vchannel) return interaction.reply({content: "You have to be in a voice channel to use this command", ephemeral: true})
      
  let game = interaction.options.getString("game")
  
    	const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Join')
					.setStyle('PRIMARY'))
        .addComponents(
				new MessageButton()
					.setCustomId('leave')
					.setLabel('Leave')
					.setStyle('DANGER'),
			);
      
await db.set(`users_${interaction.guild.id}_${interaction.member.id}`, [])
await db.push(`users_${interaction.guild.id}_${interaction.member.id}`, `<@${interaction.member.id}>`)
      
let users = await db.get(`users_${interaction.guild.id}_${interaction.member.id}`)
    
  
 let game2 = interaction.options.getString('game');
      
    let embed = new MessageEmbed()
   .setTitle(`New ${game2} LFG Post!`)
   .setDescription(`${interaction.member} is looking for a group! \n───────────── \nJoin them in ${vchannel} with ${vchannel.members.size -1} other player(s) \n\n${link}  \n───────────── \n**Description:** ${answer} \n\n**Members currently in group:** \n• ${users}`)
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
   .setFooter({text: `Powered by ${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
   .setTimestamp()
  
 if(game2 === 'Other') embed.setTitle(`New LFG Post!`);
  
if(answer === null || answer === 'null') embed.setDescription(`${interaction.member} is looking for a group! \n───────────── \nJoin them in ${vchannel} with ${vchannel.members.size -1} other player(s) \n\n${link}  \n───────────── \n**Description:** Not Provided \n\n**Members currently in group:** \n• ${users}`)
      
await interaction.channel.send({embeds: [embed], components: [row]}).then(msg => {
    let url = msg.id
    db.set(`message_${interaction.member.id}`, url)
  })
      
await interaction.reply({content: "Your LFG post is live!", ephemeral: true})

const msgid = await db.get(`message_${interaction.member.id}`)

const filter = i => i.message.id === msgid

const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: 'BUTTON' });
      

collector.on('collect', async i => {
	if (i.customId === 'primary') {
    
  if(i.user.id === interaction.user.id) return await i.reply({content: "You can't join a post you created", ephemeral: true})
      
  
    
let answer2 = interaction.options.getString('description');
let id = db.get(`message_${interaction.member.id}`)

let alreadyjoined = await db.get(`joined_${interaction.member.id}_${id}_${i.user.id}`)

if(alreadyjoined === 'true' || alreadyjoined === true) return await i.reply({content: "You can't join a post you are already in", ephemeral: true})



await db.set(`joined_${interaction.member.id}_${id}_${i.user.id}`, true)
    
    
await db.push(`users_${interaction.guild.id}_${interaction.member.id}`, `<@${i.member.id}>`)

    
let users2 = await db.get(`users_${interaction.guild.id}_${interaction.member.id}`)

  let editembed = new MessageEmbed()
   .setTitle(`New LFG Post!`)
   .setDescription(`${interaction.member} is looking for a group! \n───────────── \nJoin them in ${vchannel} with ${vchannel.members.size -1} other player(s) \n\n${link}  \n───────────── \n**Description:** ${answer2} \n\n**Members currently in group:** \n• ${users2.join("\n• ")}`)
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
   .setFooter({text: `Powered by ${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
   .setTimestamp()
  
   if(answer2 === null || answer2 === 'null') editembed.setDescription(`${interaction.member} is looking for a group! \n───────────── \nJoin them in ${vchannel} with ${vchannel.members.size -1} other player(s) \n\n${link}  \n───────────── \n**Description:** Not Provided \n\n**Members currently in group:** \n• ${users2.join("\n• ")}`) 
    
		await i.update({ embeds: [editembed], components: [row] }) 
  
  let interestedembed = new MessageEmbed()
   .setTitle(`A member of ${interaction.guild} joined your LFG post`)
   .setDescription(`\n${i.member} has joined your LFG post`)
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
   .setFooter({text: `Powered by ${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
   .setTimestamp()
    try {
  await interaction.user.send({embeds: [interestedembed]})
  } catch(err) {
  console.log(err)
  }
    
	}
else
  
if(i.customId === 'leave') {
  
if(i.user.id === interaction.user.id) return await i.reply({content: "You can't leave your own LFG post, to delete it run the command `/deletelfg`", ephemeral: true}).catch(err => {
      console.log(err)
      return;
  });
    
let answer2 = interaction.options.getString('description');
let id = db.get(`message_${interaction.member.id}`)

let alreadyjoined = await db.get(`joined_${interaction.member.id}_${id}_${i.user.id}`)

if(!alreadyjoined) return await i.reply({content: "You can't leave a post you are not already in", ephemeral: true}).catch(err => {
      console.log(err)
      return;
  });
  
let users = db.get(`users_${interaction.guild.id}_${interaction.member.id}`, []);
let index = users.indexOf(`<@${i.member.id}>`)

if (index > -1) users.splice(index, 1);

db.set(`users_${interaction.guild.id}_${interaction.member.id}`, users);
  
await db.delete(`joined_${interaction.guild.id}_${interaction.member.id}`, i.user.tag)
await db.delete(`joined_${interaction.member.id}_${id}_${i.user.id}`)
  
let users3 = await db.get(`users_${interaction.guild.id}_${interaction.member.id}`)

  let editembed = new MessageEmbed()
   .setTitle(`New LFG Post!`)
   .setDescription(`${interaction.member} is looking for a group! \n───────────── \nJoin them in ${vchannel} with ${vchannel.members.size -1} other player(s) \n\n${link}  \n───────────── \n**Details:** ${answer2} \n\n**Members currently in group:** \n• ${users3.join("\n• ")}`)
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
   .setFooter({text: `Powered by ${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
   .setTimestamp()
  
if(answer2 === null || answer2 === 'null') editembed.setDescription(`${interaction.member} is looking for a group! \n───────────── \nJoin them in ${vchannel} with ${vchannel.members.size -1} other player(s) \n\n${link}  \n───────────── \n**Description:** Not Provided \n\n**Members currently in group:** \n• ${users.join("\n• ")}`) 
  
		await i.update({ embeds: [editembed], components: [row] });
      
    let interestedembed2 = new MessageEmbed()
   .setTitle(`A member of ${interaction.guild} left your LFG post`)
   .setDescription(`\n${i.member} has left your LFG post`)
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
   .setFooter({text: `Powered by ${client.user.username}`, iconURL: client.user.displayAvatarURL({dynamic: true})})
   .setTimestamp()
    
  try {
  await interaction.user.send({embeds: [interestedembed2]})
  } catch(err) {
  console.log(err)
  }
  
	}
  

});
      
let msgchannel = interaction.channel.id;
      
await db.add(`lfg_${interaction.guild.id}`, 1)
await db.set(`lfg2_${interaction.member.id}`, true)
await db.set(`channel_${interaction.member.id}`, msgchannel)
let lfg = db.get(`lfg_${config.guildId}`)
if(lfg === null){
client.user.setActivity(`0 player(s) lfg`, { type: 'WATCHING' });
}
else
{
client.user.setActivity(`${lfg} player(s) lfg`, { type: 'WATCHING' });
}
  
}
    }
    
   
   
