
const { ChannelType,PermissionFlagsBits ,  SlashCommandBuilder , EmbedBuilder , ButtonStyle , ButtonBuilder , ActionRowBuilder } = require('discord.js');
const config = require('../../config');
module.exports = async (interaction,client) => {
    if (!interaction.isButton()) return;

    await interaction.deferReply({ephemeral:true});
    const ticketName = `ticket-${interaction.user.username}`.toLowerCase();
            const supportRoles = await config.ticketRoles.map(x => {
                return {
                    id: x,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ManageMessages]
                }
            });
            if (interaction.guild.channels.cache.find(c => c.topic == interaction.user.id && c.name.includes("ticket"))) return interaction.editReply({ content: config.ticket.haveTicket , ephemeral: true });
           const createdChannel = await interaction.guild.channels.create({
                name: ticketName,
                type: ChannelType.GuildText,
                topic: `${interaction.user.id}`,
                parent: config.ticketsOpenCategory,
                permissionOverwrites: [
                    {
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.EmbedLinks],
                        id: interaction.user.id,
                    },
                    {
                        deny: PermissionFlagsBits.ViewChannel,
                        id: interaction.guild.id,
                    },
                    ...supportRoles
                ],
              });

              await interaction.editReply({ content: `${config.ticket.success} ${createdChannel}!` , ephemeral: true });
              const customerButton = new ButtonBuilder()
              .setStyle(ButtonStyle.Danger)
              .setEmoji("🔒")
              .setCustomId("confirm-close");
              const adminButton = new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setEmoji("🕵️‍♂️")
              .setLabel(config.ticket.adminButton)
              .setCustomId("admin-options");
              /*const alertButton = new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji("📩")
              .setLabel(config.ticket.alertButton)
              .setCustomId("alert");*/
              const row = new ActionRowBuilder()
              .addComponents(customerButton,adminButton);
              const embed = new EmbedBuilder()
              .setTitle(config.ticket.title)
            .setDescription(`Hello <@!${interaction.user.id}>, ${config.ticket.description}`)
            .setColor(config.ticket.color)
            .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.guild.iconURL()}` });

            await createdChannel.send({ content: `${config.ticketRoles.map((m) => `<@&${m}>`).join(", ")}. New Ticket!`, embeds: [embed], components: [row] });

            
           
}