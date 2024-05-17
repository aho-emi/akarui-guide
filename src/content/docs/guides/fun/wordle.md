---
title: Wordle
description: Fun command
---

Fun command to play wordle.

**Credit**: [ahoemi.offficial](https://discord.com/users/715852000096419900)

### Requirement

```bash
npm i discord-gamecord
```

### Main Code

```js
client.command({
  name: "wordle",
  code: `
$djsEval[
const { Wordle } = require("discord-gamecord");

    const Game = new Wordle({
      message: d.message,
      isSlashGame: false,
      embed: {
        title: 'Wordle',
        color: '#00FFFF',
      },
      customWord: null,
      timeoutTime: 60000,
      winMessage: 'You won! The word was **{word}**.',
      loseMessage: 'You lost! The word was **{word}**.',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });

    Game.startGame();`,
});
```

This code works best in any version
