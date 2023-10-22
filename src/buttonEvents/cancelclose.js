const config = require('../../config');
    module.exports = async (interaction, client) => {
        if (!interaction.isButton()) return;
       // console.log(interaction.message);return;
        await interaction.message.delete();
    
    
    }