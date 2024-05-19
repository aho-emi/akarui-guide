---
title: Withdraw
description: Command to see s user's balance.
---

Command to withdraw money from bank.

### Main Code

```js
client.command({
  name: "withdraw",
  aliases: ["with", "cashout"],
  $if: "old",
  code: `
  $if[$message[1]==all]
  Withdrew \`$numberSeparator[$get[amtToWith];,]\` from the bank. Bank is empty now!
  $setGlobalUserVar[bank;$math[$getGlobalUserVar[bank]-$get[amtToWith]]]
  $setGlobalUserVar[money;$math[$getGlobalUserVar[money]+$get[amtToWith]]]

  $let[amtToWith;$getGlobalUserVar[bank]]
  
  $elseif[$isNumber[$message[1]]==true]
  withdrew \`$numberSeparator[$get[amtToWith];,]\` from the bank. $ifAwaited[$getGlobalUserVar[bank]==0;Bank is empty now!]

  $setGlobalUserVar[bank;$math[$getGlobalUserVar[bank]-$get[amtToWith]]]
  $setGlobalUserVar[money;$math[$getGlobalUserVar[money]+$get[amtToWith]]]

  $let[amtToWith;$message[1]]

  $onlyIf[$getGlobalUserVar[bank]>=$message[1];You don't have that much money to withdraw.]
  $endelseif
  $endif
  
  $onlyif[$getGlobalUserVar[bank;$authorId]>0;You have no money to withdraw.]
  `,
});
```

This code works best in version6.7.1
