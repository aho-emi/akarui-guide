---
title: Balance
description: Command to see s user's balance.
sidebar:
  label: Balance
  order: 1
---

Command to see s user's balance.

### Variables

```js
client.variables({
  bank: 0,
  bankLimit: 10000,
  money: 0,
});
```

### Main Code

```js
client.command({
  name: "balance",
  aliases: ["bal", "money", "bank", "cash"],
  code: `
  $author[$username[$get[id]];$userAvatar[$get[id]]]
  $title[\[ Balance \]]
  $description[🪙 | **__Wallet__ :** \`$numberSeparator[$getGlobalUserVar[money;$get[id]];,]\`
  🏦 | **__Bank__   :** \`$numberSeparator[$getGlobalUserVar[bank;$get[id]];,]\` / \`$numberSeparator[$getGlobalUserVar[bankLimit;$get[id]];,]\`
  💰 | **__Net Worth__:** \`$numberSeparator[$sum[$getGlobalUserVar[bank;$get[id]];$getGlobalUserVar[money;$get[id]]];,]\`]
  $footer[Akarui: Guide]
  $color[Random]
  
  $let[id;$findUser[$message;true]]`,
});
```

This code works best in version6.7.1
