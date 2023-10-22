const {  EmbedBuilder , ButtonStyle , ButtonBuilder , ActionRowBuilder } = require('discord.js');
const config = require('../../config');
module.exports = async (interaction, client) => {
    if (!interaction.isButton()) return;
    const useralert = await interaction.channel.topic;
    const useralerted = await interaction.guild.members.fetch(useralert);
    const thumbnail= await interaction.guild.iconURL();
    const channel = await interaction.channel;
    const embed = new EmbedBuilder()
    .setTitle(config.alertmessage.title)
    .setDescription(config.alertmessage.description)
    .setColor(`${config.alertmessage.color}`)
    .setThumbnail(thumbnail)
    .setFooter({ text: `${config.sendPanel.footerText}`, iconURL: `${interaction.guild.iconURL()}` });
    await useralerted.send({content:`${channel.url}`,embeds:[embed]}).catch(error => {
         interaction.channel.send({content:config.alertmessage.error,ephemeral:true})
    });
    await interaction.channel.send(`${useralerted}`);
    await interaction.reply({content:config.alertmessage.success,ephemeral:true});
   

}
