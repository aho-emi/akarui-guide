---
title: Deposit
description: Command to see s user's balance.
pagefind: false
sidebar:
  hidden: true
prev: false
next: false
---

Command to deposit money into the bank.

### Main Code

```js
client.command({
  name: "deposit",
  aliases: ["dep"],
  $if: "old",
  code: `
  $if[$message[1]==all]
  Deposited \`$numberSeparator[$get[amtToDep];,]\` into the bank. Bank is full now!
  $setGlobalUserVar[bank;$math[$getGlobalUserVar[bank]+$get[amtToDep]]]
  $setGlobalUserVar[money;$math[$getGlobalUserVar[money]-$get[amtToDep]]]

  $let[amtToDep;$ifAwaited[$getGlobalUserVar[money]>$get[maxAmtCanDep];$get[maxAmtCanDep];$getGlobalUserVar[money]]]
  $let[maxAmtCanDep;$math[$getGlobalUserVar[bankLimit]-$getGlobalUserVar[bank]]]

  $onlyIf[$getGlobalUserVar[money]>=0;You don't have any money to deposit.]
  $elseif[$isNumber[$message[1]]==true]
  Deposited \`$numberSeparator[$get[amtToDep];,]\` into the bank. $ifAwaited[$getGlobalUserVar[bank]==$getGlobalUserVar[bankLimit];Bank is full now!]

  $setGlobalUserVar[bank;$math[$getGlobalUserVar[bank]+$get[amtToDep]]]
  $setGlobalUserVar[money;$math[$getGlobalUserVar[money]-$get[amtToDep]]]

  $let[amtToDep;$ifAwaited[$message[1]>$get[maxAmtCanDep];$get[maxAmtCanDep];$message[1]]]
  $let[maxAmtCanDep;$math[$getGlobalUserVar[bankLimit]-$getGlobalUserVar[bank]]]

  $onlyIf[$getGlobalUserVar[money]>=$message[1];You don't have that much money to deposit.]
  $endelseif
  $endif
  
  $onlyif[$getGlobalUserVar[money;$authorId]!=0;You have no money to deposit.]
  `,
});
```

This code works best in version6.7.1
