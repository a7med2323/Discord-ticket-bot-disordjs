const { SlashCommandBuilder , ChannelType , EmbedBuilder , ButtonStyle , ButtonBuilder , ActionRowBuilder,PermissionFlagsBits } = require('discord.js');
const config = require('../../config');

module.exports = {
  data: new SlashCommandBuilder()
          .setName('removemember')
          .setDescription('remove member from your ticket')
          .addUserOption(option =>
            option.setName('user')
                .setDescription('the user to remove from the ticket')
                .setRequired(true))
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
          
  run: async ({ interaction, client, handler }) => {
    const admin =  await config.adminss;
   
      if(!admin.includes(interaction.member.id)){ await interaction.reply({content:config.notpermitted,ephemeral:true}); return;};
    const user = await interaction.options.getUser("user");
    
    
    if(interaction.channel.name.includes("close") || interaction.channel.name.includes("ticket")) {
        interaction.channel.permissionOverwrites.edit(user.id, {
            ATTACH_FILES: false,
            READ_MESSAGE_HISTORY: false,
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
        });
        
        interaction.reply({ content: `${user} was removed from the ticket by ${interaction.user}` });
    } else {
        interaction.reply({ content: "This command can only be used on tickets!", ephemeral: true });
    }
     
  },
  //deleted:true
};