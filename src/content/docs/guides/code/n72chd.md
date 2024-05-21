---
title: Anime Quiz
description: Fun command
pagefind: false
sidebar:
  hidden: true
prev: false
next: false
---

Fun command to guess the name and series of a character.

### Requirement

```bash
npm i discord-gamecord
```

### Main Code

```js
client.command({
  name: "quiz",
  code: `
  $djsEval[(async () => {
  const fetch = require("node-fetch");
  const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
  let messageSent = await d.channel.send("Generating Guiz");
  
        const page = \`
        { Page(page: 1, perPage: 1000){
            media (sort: POPULARITY_DESC, isAdult: false){
                title { english romaji }
                id
                characters(sort: FAVOURITES_DESC, perPage: 100){
                    nodes{ id name { full } image{ large } }
                }
            }
            }
        }\`;
  
        function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
        }
  
        const response = await fetch("https://graphql.anilist.co/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: page })
        });
  
        const data = await response.json();
        const media = data.data.Page.media;
  
        if (media.length > 0) {
        const characters = media.flatMap(media => media.characters.nodes);
        const shuffledCharacters = shuffleArray(characters);
        const character = shuffledCharacters[Math.floor(Math.random() * shuffledCharacters.length)];
        const otherCharacters = shuffledCharacters.filter(char => char.id !== character.id);
  
        const quizType = Math.floor(Math.random() * 2) + 1;
        let quizQuestion, rightAnswer, wrongAnswers;
        if (quizType === 1) {
            // Series Question
            quizQuestion = "Name the series of this character:";
            rightAnswer = media.find(media => media.characters.nodes.some(node => node.id === character.id)).title.english || "Unknown";
            wrongAnswers = shuffleArray(media.map(media => media.title.english || media.title.romaji || "Unknown")).slice(0, 3);
        } else {
            // Character Question
            quizQuestion = "Name this character:";
            rightAnswer = character.name.full;
            wrongAnswers = shuffleArray(otherCharacters.map(char => char.name.full)).slice(0, 3);
        }
  
        const embed = new EmbedBuilder()
            .setTitle('Anime Quiz')
            .setDescription(quizQuestion)
            .setThumbnail(character.image.large);
  
        const buttons = [
            new ButtonBuilder().setCustomId('right').setLabel(rightAnswer).setStyle(1),
            new ButtonBuilder().setCustomId('wrong1').setLabel(wrongAnswers[0]).setStyle(1),
            new ButtonBuilder().setCustomId('wrong2').setLabel(wrongAnswers[1]).setStyle(1),
            new ButtonBuilder().setCustomId('wrong3').setLabel(wrongAnswers[2]).setStyle(1)
        ];
  
        const row = new ActionRowBuilder().addComponents(buttons);
  
        const sentMessage = await messageSent.edit({ content: "", embeds: [embed], components: [row] });
  
        const filter = interaction => interaction.user.id === d.author.id;
        const collector = sentMessage.createMessageComponentCollector({ filter, time: 15000 });
  
        collector.on('collect', interaction => {
            if (interaction.customId === 'right') {
                interaction.reply({ content: \`Congratulations! **\${rightAnswer}** is indeed the right answer\` });
            } else {
                const actionRow = interaction.message.components[0]
                let clickedButton = actionRow.components.find(button => button.customId === interaction.customId)
                interaction.reply({ content: \`**\${clickedButton.label}** was the wrong answer, The right answer was **\${rightAnswer}**\`});
            }
            collector.stop();
        });
  
        collector.on('end', collected => {
            if (collected.size === 0) {
                d.channel.send('Time is up!');
            }
        });
  
        } else {
        console.log("No media found.");
        }
  
  })()]
  `,
});
```

This code works best in any version
