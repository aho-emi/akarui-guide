---
title: Fish
description: Fun command
sidebar:
  label: Fish
  order: 3
---

Fun command to play catch and sell fish.

### Requirement

```bash
npm i discord-gamecord
```

### Variables

```diff lang="js"
client.variables({
  money: 0,
+ fishes: '{"junk": 0, "common": 0, "uncommon": 0, "rare": 0}'
});
```

### Fish Show Code

```js
client.command({
  name: "fish",
  aliases: ["fishes"],
  code: `
  $title[$username's Fishes]
  $description[:wrench: **Junk**: $getObjectProperty[fish;junk]
  :fish: **Common**: $getObjectProperty[fish;common]
  :tropical_fish: **Uncommon**: $getObjectProperty[fish;uncommon]
  :blowfish: **Rare**: $getObjectProperty[fish;rare]]
  $footer[fish catch | fish sell]
  $color[00ffff]
  
  $createObject[fish;$getGlobalUserVar[fishes]]`,
});
```

### Fish Catch Code

```js
client.command({
  name: "fish catch",
  code: `
    $djsEval[(async () => {
        const { Fishy } = require("discord-gamecord");
        const fishes = JSON.parse('$getGlobalUserVar[fishes]');
        let player = {
          id: "$authorID",
          fishes: fishes,
          balance: parseInt('$getGlobalUserVar[money]')
        };
    
        const Game = new Fishy({
          message: d.message,
          isSlashGame: false,
          player: player,
          embed: {
            title: "Fishy Inventory",
            color: "#5865F2",
          },
          fishes: {
            junk: { emoji: "🔧", price: 25 },
            common: { emoji: "🐟", price: 100 },
            uncommon: { emoji: "🐠", price: 250 },
            rare: { emoji: "🐡", price: 500 },
          },
          fishyRodPrice: 50,
          catchMessage: "You caught a {fish}. You paid {amount}🪙 for the fishing rod.",
          sellMessage: "You sold {amount}x {fish} {type} items for a total of {price}🪙.",
          noBalanceMessage: "You don't have enough balance to rent a fishing rod.",
          invalidTypeMessage: "Fish type can only be junk, common, uncommon or rare.",
          invalidAmountMessage: "Amount must be between 0 and fish max amount.",
          noItemMessage: "You don't have any of this item in your inventory.",
        });
    
        // Catch Fish
        Game.on("catchFish", (fishy) => {
          player = fishy.player;
          try {
            d.client.db.set("main", "fishes".addBrackets(), player.id, JSON.stringify(player.fishes));
            d.client.db.set("main", "money".addBrackets(), player.id, player.balance)
          } catch (e) {}
        });
    
        Game.catchFish();
    
    })()]`,
});
```

### Fish Catch Code

```js
client.command({
  name: "fish sell",
  code: `
      $djsEval[(async () => {
        const { Fishy } = require("discord-gamecord");
        const fishes = JSON.parse('$getGlobalUserVar[fishes]');
        let player = {
          id: "$authorID",
          fishes: fishes,
          balance: parseInt('$getGlobalUserVar[money]')
        };

        const Game = new Fishy({
          message: d.message,
          isSlashGame: false,
          player: player,
          embed: {
            title: "Fishy Inventory",
            color: "#5865F2",
          },
          fishes: {
            junk: { emoji: "🔧", price: 25 },
            common: { emoji: "🐟", price: 100 },
            uncommon: { emoji: "🐠", price: 250 },
            rare: { emoji: "🐡", price: 500 },
          },
          fishyRodPrice: 50,
          catchMessage: "You caught a {fish}. You paid {amount}🪙 for the fishing rod.",
          sellMessage: "You sold {amount}x {fish} {type} items for a total of {price}🪙.",
          noBalanceMessage: "You don't have enough balance to rent a fishing rod.",
          invalidTypeMessage: "Fish type can only be junk, common, uncommon or rare.",
          invalidAmountMessage: "Amount must be between 0 and fish max amount.",
          noItemMessage: "You don't have any of this item in your inventory.",
        });

        Game.on("sellFish", (fishy) => {
          player = fishy.player;
          try {
            d.client.db.set("main", "fishes".addBrackets(), player.id, JSON.stringify(player.fishes));
            d.client.db.set("main", "money".addBrackets(), player.id, player.balance)
          } catch (e) {}
        });
        Game.sellFish(String("$toLowerCase[$message[1]]"), Number(\`$if[$message[2]==all;\${player.fishes["$toLowerCase[$message[1]]"]};$message[2]]\`) || 1)
      })()]
      `,
});
```

This code works best in version 6.7.1
