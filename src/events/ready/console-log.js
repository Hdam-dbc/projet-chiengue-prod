const { ActivityType } = require('discord.js');

module.exports = (client) => {
    console.log(`${client.user.tag} is ready, shitsorm started`); 
    client.user.setActivity({
        name: 'Crotte sa niche',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/shorts/C0qRymKS3Bw',
    });
};