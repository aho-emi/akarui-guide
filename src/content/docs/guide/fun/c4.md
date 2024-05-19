---
title: Connect4
description: Fun command
---

Fun command to play connect4 with your friend

**Credit**: [dodogames](https://discord.com/users/632607624742961153)

### Requirement

```bash
npm i discord-gamecord
```

### Main Code

```js
client.command({
  name: "connect4",
  aliases: ["c4", "connectfour"],
  code: `$djsEval[const { Connect4 } = require('discord-gamecord');
  
  const Game = new Connect4({
    message: message,
    isSlashGame: false,
    opponent: message.mentions.users.first(),
    embed: {
      title: 'Connect4 Game',
      statusTitle: 'Status',
      color: "#00ffff"
    },
    emojis: {
      board: '⚪',
      player1: '🔴',
      player2: '🟡'
    },
    mentionUser: true,
    timeoutTime: 60000,
    buttonStyle: 'SECONDARY',
    turnMessage: '{emoji} | Its turn of player **{player}**.',
    winMessage: '{emoji} | **{player}** won the Connect4 Game.',
    tieMessage: 'The Game tied! No one won the Game!',
    timeoutMessage: 'The Game went unfinished! No one won the Game!',
    playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
  });
  Game.startGame();
  ]
  $onlyIf[$isBot[$mentioned[1;true]]==false;You cannot play with bots!]
  $onlyIf[$mentioned[1;true]!=$authorID;Please mention a opponent to play with!]
  $cooldown[5s;Slow down! Don't spam the command!
  Time remaining: <t:$truncate[$divide[$sum[$getCooldownTime[5s;user;connect4;$authorID];$dateStamp];1000]]:R>]
  `,
});
```

This code works best in any version
