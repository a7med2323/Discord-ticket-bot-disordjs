
const {  EmbedBuilder  } = require('discord.js');
const config = require('../../config');
module.exports = async(interaction,client)=>{

    if (!interaction.isButton()) return;
    await interaction.deferReply();
    const user = await interaction.user;
    const thumbnail= await interaction.guild.iconURL();
    const embed = new EmbedBuilder()
    .setTitle(config.recievedMessage.title)
    .setDescription(`${config.recievedMessage.description} ${user}` )
    .setThumbnail(thumbnail)
    .setColor(config.recievedMessage.color)
    .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}` });;
     
   
     await interaction.editReply({embeds:[embed]});
}