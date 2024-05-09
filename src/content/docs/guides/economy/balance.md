---
title: Balance
description: Command to see s user's balance.
---

Command to see s user's balance.

**Credit**: [ahoemi.offficial](https://discord.com/users/715852000096419900)

### Variables

```js
client.variables({
  money: "",
  bank: "",
});
```

### Main Code

```js
client.command({
  name: "balance",
  aliases: ["bal", "money", "bank"],
  code: `
  $author[$username[$get[id]];$userAvatar[$get[id]]]
  $title[\[ Balance \]]
  $description[🪙 **__Wallet__ :** \`$numberSeparator[$getUserVar[money;$get[id]];,]\`
  🏦 **__Bank__   :** \`$numberSeparator[$getUserVar[bank;$get[id]];,]\`
  💰 **__Net Worth__:** \`$numberSeparator[$sum[$getUserVar[bank;$get[id]];$getUserVar[bank;$get[id]]];,]\`]
  $footer[Akarui: Guide]
  $color[Random]
  
  $let[id;$findUser[$message;true]]`,
});
```

This code works best in version6.7.1
