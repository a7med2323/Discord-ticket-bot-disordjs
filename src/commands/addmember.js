const { SlashCommandBuilder , ChannelType , EmbedBuilder , ButtonStyle , ButtonBuilder , ActionRowBuilder,PermissionFlagsBits } = require('discord.js');
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
          .setName('addmember')
          .setDescription('add member to your ticket')
          .addUserOption(option =>
            option.setName('user')
                .setDescription('the user to add to the ticket')
                .setRequired(true))
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
          
  run: async ({ interaction, client, handler }) => {
    const admin =  await config.adminss;
    
      if(!admin.includes(interaction.member.id)){ await interaction.reply({content:config.notpermitted,ephemeral:true}); return;};
    const user = await interaction.options.getUser("user");
    
    
    if(interaction.channel.name.includes("close") || interaction.channel.name.includes("ticket")) {
        interaction.channel.permissionOverwrites.edit(user.id, {
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true,
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        });
        
        interaction.reply({ content: `${user} was added to the ticket by ${interaction.user}` });
    } else {
        interaction.reply({ content: "This command can only be used on tickets!", ephemeral: true });
    }
     
  },
  //deleted:true
};