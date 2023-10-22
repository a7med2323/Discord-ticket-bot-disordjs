
const fs = require('node:fs');
const path = require('node:path');

module.exports = async (interaction, client, handler) => {

if (!interaction.isButton())return;
const interactionId = await interaction.customId;
if (interaction.customId = interactionId){
    const eventsPath = path.join(__dirname, '../../buttonEvents');
    const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));


    if (!eventsFiles.includes(`${interactionId}.js`)){return}
        
        const filePath = path.join(eventsPath, `${interactionId}.js`);
        const buttonEvent = require(filePath);
        buttonEvent(interaction);
        
  
}
   


}