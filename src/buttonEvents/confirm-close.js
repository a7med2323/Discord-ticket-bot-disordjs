const { ChannelType,PermissionFlagsBits ,  SlashCommandBuilder , EmbedBuilder , ButtonStyle , ButtonBuilder , ActionRowBuilder } = require('discord.js');
const config = require('../../config');
    module.exports = async (interaction, client) => {
        if (!interaction.isButton()) return;
        const channel = await interaction.channel;
        const member = await interaction.guild.members.cache.get(channel.topic);
        const guild = await interaction.guild;
        const thumbnail = await interaction.guild.iconURL();
        await interaction.deferReply({ephemeral:true});
       /* const cancelButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setEmoji("✖️")
        .setCustomId("cancelclose");*/
        const confirmButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji("✔️")
        .setCustomId("close");
        const rowe = new ActionRowBuilder()
        .addComponents(confirmButton);
        const embed = new EmbedBuilder()
            .setTitle(config.closeMessage.confirmTitle)
            .setDescription(config.closeMessage.confirmDescription)
            .setColor(config.closeMessage.color)
            .setThumbnail(thumbnail)
            .setFooter({ text: `${config.sendPanel.footerText}`, iconURL: `${guild.iconURL()}` });
        await interaction.editReply({embeds:[embed],components:[rowe],ephemeral:true});
            
    
    }