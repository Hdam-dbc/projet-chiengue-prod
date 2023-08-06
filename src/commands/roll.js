const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription("roll un dé")
    .addNumberOption(option1 => 
        option1.setName('taille-dé').setDescription('La taille du dé zebi').setRequired(true),
        
    )
    .addNumberOption(option2 => 
        option2.setName('combiengue').setDescription('Combiengue de dés oh congue').setRequired(true), 
    )
    .addNumberOption(option3 => 
        option3.setName('modificateur').setDescription('Saisissez votre bonus/malus').setRequired(true), 
    ),
    
    
    run: ({ interaction }) => {
        const taille = interaction.options._hoistedOptions[0].value;
        const number = interaction.options._hoistedOptions[1].value;
        const mod = interaction.options._hoistedOptions[2].value;
        var results = [];
        for (let i = 0; i< number; i++){
            results.push(getRandomNumber(0,taille) + mod);
        };
        const embed = new EmbedBuilder()
            .setTitle(`Résultat avec un bonus/malus de ${mod}: `)
            .setColor('Random')
            .setDescription(`${results}`)
            .setTimestamp();
        interaction.reply({ embeds : [embed] });
    }
}