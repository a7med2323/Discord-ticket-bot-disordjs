const {  EmbedBuilder , ButtonStyle , ButtonBuilder , ActionRowBuilder } = require('discord.js');
const config = require('../../config');
    module.exports = async (interaction, client) => {
        if (!interaction.isButton()) return;
        const roles = await interaction.member.roles.cache;
        let rolesArray = Array.from( roles.keys() );
        const ticketRoles = config.ticketRoles;
        const intersection = ticketRoles.filter(element => rolesArray.includes(element));
      
       if (intersection.length==0){
        await interaction.deferReply({ephemeral:true});
        await interaction.editReply(config.notAllowedMessage);
        return;
       }
        const channel = await interaction.channel;
        const member = await interaction.guild.members.cache.get(channel.topic);
        const guild = await interaction.guild;
        const thumbnail = await interaction.guild.iconURL();
        await interaction.deferReply({ephemeral:true});
        const recieveButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setEmoji(config.adminOptions.supportRecieveEmoji)
        .setCustomId("recieve");
        const alertButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Danger)
        .setEmoji(config.adminOptions.supportAlertEmoji)
        .setCustomId("alert");
        const deleteButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setEmoji("🗑️")
                .setCustomId("ticket-delete");
        const rowe = new ActionRowBuilder()
        .addComponents(alertButton,recieveButton,deleteButton);
        const embed = new EmbedBuilder()
            .setTitle(config.adminOptions.Title)
            .setDescription(config.adminOptions.Description)
            .setColor(`${config.adminOptions.EmbedColor}`)
            .setThumbnail(thumbnail)
            .setFooter({ text: `${config.sendPanel.footerText}`, iconURL: `${guild.iconURL()}` });
        await interaction.editReply({embeds:[embed],components:[rowe],ephemeral:true});
            
    
    }