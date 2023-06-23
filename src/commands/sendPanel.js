const { SlashCommandBuilder , ChannelType , EmbedBuilder , ButtonStyle , ButtonBuilder , ActionRowBuilder,PermissionFlagsBits } = require('discord.js');
const config = require('../../config');
module.exports = {
  data: new SlashCommandBuilder()
          .setName('send-panel')
          .setDescription('Sends the ticket panel to the channel you want')
          .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the panel to')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
          
  run: async ({ interaction, client, handler }) => {
    const admin =  config.adminss;
      if(!admin.includes(interaction.member.id)){ await interaction.reply({content:config.notpermitted,ephemeral:true}); return;};
    const channel = await interaction.options.getChannel('channel');
    const thumbnail = await interaction.guild.iconURL();
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(config.sendPanel.title)
    //.setAuthor({ name: config.form.author, iconURL: config.form.authoricon, url: config.form.authorurl })
    .setThumbnail(thumbnail)
    .setDescription(config.sendPanel.description)
    //.addFields({  name:'title',value: config.form.description })
    //.setImage(config.form.image)
    .setFooter({ text: config.sendPanel.footerText, iconURL: thumbnail });
    const autoRole = new ButtonBuilder()
        .setCustomId('createTicket')
        .setLabel(config.sendPanel.buttonText)
        .setStyle(ButtonStyle.Primary);
    const row = new ActionRowBuilder()
    .addComponents(autoRole);
await interaction.reply({content:'form is submit!',ephemeral:true});
await channel.send({content:'@everyone',embeds: [exampleEmbed],components:[row] });
  },
 //deleted:true
};