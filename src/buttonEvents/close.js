const { EmbedBuilder , ButtonStyle , ButtonBuilder , ActionRowBuilder } = require('discord.js');
const config = require('../../config');
    module.exports = async (interaction, client) => {
        if (!interaction.isButton()) return;

        if (interaction.channel.name.includes('ticket')) {
               
            
            const arra = await interaction.member.roles.cache;
            let arraa = Array.from( arra.keys() );
          
          };
            await interaction.deferReply();
            const channel = await interaction.channel;
            const member = await interaction.guild.members.cache.get(channel.topic);
            const guild = await interaction.guild;
            await guild.channels.edit(channel.id,{parent: config.ticketsCloseCategory});
            const messages = await channel.messages.fetch();
            const thumbnail = await interaction.guild.iconURL();
            const customerButton = new ButtonBuilder()
              .setStyle(ButtonStyle.Danger)
              .setEmoji("🔒")
              .setCustomId("close")
              .setDisabled(true);
              const adminButton = new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setEmoji("🕵️‍♂️")
              .setLabel(config.ticket.adminButton)
              .setCustomId("admin-options");
              const rowe = new ActionRowBuilder()
              .addComponents(customerButton,adminButton);
              const message = await messages.last();
            message.edit({components:[rowe]})
            .then(msg => console.log(`Updated the content of a message to ${msg.content}`))
            .catch(console.error);
            const embed = new EmbedBuilder()
            .setTitle(config.closeMessage.title)
            .setDescription(`${config.closeMessage.description}<@!${interaction.user.id}>`)
            .setColor(config.closeMessage.color)
            .setThumbnail(thumbnail)
            .setFooter({ text: `${config.sendPanel.footerText}`, iconURL: `${guild.iconURL()}` });
            
        
             await interaction.editReply({ embeds: [embed] }).then(() => setTimeout(() => { 
                interaction.channel.permissionOverwrites.edit(member.id, {
                    SendMessages: false,
                    AttachFiles:false,
                    EmbedLinks:false,
                    ViewChannel:false,
                  });

            }, 2000));
        
        }