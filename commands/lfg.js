const { SlashCommandBuilder } = require('@discordjs/builders');
   
   module.exports = {
     
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Post a LFG')
        .addStringOption(option =>
            option.setName('details')
                .setDescription('Add in some detail (number of players needed, game, rank, etc.)')
                .setRequired(true)),
     
    async execute(interaction, config, MessageEmbed, client, db) {
     
    if(interaction.channel.parentId !== config.category) return interaction.reply({content: "Cannot use command outside LFG channels", ephemeral: true})
      
let channel = await interaction.member.voice.channel

if(!channel) return interaction.reply({content: 'You have to be in a voice channel to use this command', ephemeral: true})
      
let setup = await db.get(`lfg2_${interaction.member.id}`)

if (setup === true || setup === "true") return interaction.reply({content: "You have already have an active LFG post. To cancel the post, run the command `/deletelfg`", ephemeral: true})
      
    let answer = interaction.options.getString('details');
    let vchannel = interaction.member.voice.channel;
    let invite = await interaction.member.voice.channel.createInvite()
    let memberschannel = vchannel.members;
    let link = `${invite}`
      
  if(!vchannel) return interaction.reply({content: "You have to be in a voice channel to use this command", ephemeral: true})
      
  let embed = new MessageEmbed()
   .setTitle(`New LFG Post!`)
   .setDescription(`${interaction.member} is looking for a group! \n───────────── \nJoin them in ${vchannel} with ${vchannel.members.size -1} other player(s) \n\n${link}  \n───────────── \n**Details:** ${answer} \n\n**Members currently in group:** \n- ${memberschannel.map(g => g.toString()).join("\n- ")}`)
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
   .setFooter({text: `Powered by ${interaction.guild}`, iconURL: interaction.guild.iconURL({dynamic: true})})
   .setTimestamp()
      
await interaction.channel.send({embeds: [embed]}).then(msg => {
    let url = msg.id
    db.set(`message_${interaction.member.id}`, url)
  })
      
await interaction.reply({content: "Your LFG post is live!", ephemeral: true})

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
  
