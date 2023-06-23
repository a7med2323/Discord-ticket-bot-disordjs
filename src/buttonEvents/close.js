const { ChannelType,PermissionFlagsBits ,  SlashCommandBuilder , EmbedBuilder , ButtonStyle , ButtonBuilder , ActionRowBuilder } = require('discord.js');
const config = require('../../config');
    module.exports = async (interaction, client) => {
        if (!interaction.isButton()) return;

        if (interaction.channel.name.includes('ticket')) {
               
            
            const arra = await interaction.member.roles.cache;
            let arraa = Array.from( arra.keys() );
          
          };
            const channel = await interaction.channel;
            const member = await interaction.guild.members.cache.get(channel.topic);
            const guild = await interaction.guild;
            await guild.channels.edit(channel.id,{parent: config.ticketsCloseCategory});
            
            const messages = await channel.lastMessageId;
            //const [firstValue] = await messages.values();
            console.log(messages);
            
            //console.log(Array.from(messages)[0]);
            return;
             
            
            const deleteButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setEmoji("🗑️")
                .setDisabled(true)
                .setCustomId("ticket-delete");
          
            const row = new ActionRowBuilder()
            .addComponents(deleteButton);


            const embed = new EmbedBuilder()
            .setTitle(`ticket is closed`)
            .setDescription(` <@!${interaction.user.id}>تم غلق التذكرة بواسطة`)
            .setColor('#653386')
            .setFooter({ text: `${config.sendPanel.footerText}`, iconURL: `${guild.iconURL()}` });
            
        
             await interaction.reply({ embeds: [embed], components: [row] }).then(() => setTimeout(() => { 
                interaction.channel.permissionOverwrites.edit(member.id, {
                    SEND_MESSAGES: false,
                    ATTACH_FILES:false,
                    EMBED_LINKS:false
                  });

            }, 2000));
        
        }