const { SlashCommandBuilder } = require('@discordjs/builders');
   
   module.exports = {
     
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows the servers LFG stats'),
     
    async execute(interaction, config, MessageEmbed, client, db) {
    
     if(interaction.channel.parentId !== config.category) return interaction.reply({content: "Cannot use command outside LFG channels", ephemeral: true})
      
let number = await db.get(`lfg_${interaction.guild.id}`)

if(number === null){

interaction.reply({content: `This server has 0 player(s) looking for a group.`, ephemeral: true })

}
else
  
interaction.reply({content: `This server has ${number} player(s) looking for a group.`, ephemeral: true })

  
    }
   }
