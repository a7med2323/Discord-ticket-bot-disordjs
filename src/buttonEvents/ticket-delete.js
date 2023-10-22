module.exports = async(interaction,client)=>{

    if (!interaction.isButton()) return;
    await interaction.deferReply();
    const channel = await interaction.channel;

    await channel.delete();


}