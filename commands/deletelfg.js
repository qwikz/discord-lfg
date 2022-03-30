const { SlashCommandBuilder } = require('@discordjs/builders');
   
   module.exports = {
     
    data: new SlashCommandBuilder()
        .setName('deletelfg')
        .setDescription('Deletes a LFG post'),
     
    async execute(interaction, config, MessageEmbed, client, db) {
    
     if(interaction.channel.parentId !== config.category) return interaction.reply({content: "Cannot use command outside LFG channels", ephemeral: true})
      
    let setup = await db.get(`lfg2_${interaction.member.id}`)

if (!setup) return interaction.reply({content: "You do not currently have an active LFG post", ephemeral: true})
      
let url = db.get(`message_${interaction.member.id}`)
let channelid = db.get(`channel_${interaction.member.id}`)
let channel = client.channels.cache.get(channelid)

await db.delete(`lfg_${interaction.guild.id}`, 1)
await db.delete(`lfg2_${interaction.member.id}`)
await channel.messages.fetch(url).then(msg => msg.delete())
let lfg = db.get(`lfg_${config.guildId}`)
if(lfg === null){
client.user.setActivity(`0 player(s) lfg`, { type: 'WATCHING' });
}
else
{
client.user.setActivity(`${lfg} player(s) lfg`, { type: 'WATCHING' });
}
      
interaction.reply({content: "Your LFG post has been deleted", ephemeral: true})
      

  
    }
   }