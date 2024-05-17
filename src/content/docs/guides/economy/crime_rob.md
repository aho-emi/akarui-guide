---
title: Crime & Rob Command
description: Fun command for economy bot.
---

Fun command for economy bot.

**Credit**: [ahoemi.offficial](https://discord.com/users/715852000096419900)

### Variables

```diff lang="js"
client.variables({
  bank: 0,
  bankLimit: 10000,
  money: 0,
+ robbed: "0"
});
```

### Rob Command

```js
client.command({
  name: "rob",
  $if: "old",
  code: `
    $if[$checkContains[$random[1;4];1;3]==true]
    Robbed $numberSeparator[$truncate[$get[robAmt]];,] from **$username[$mentioned[1]]\*\*.

$setGlobalUserVar[robbed;$math[$dateStamp+$parseTime[2h]];$mentioned[1]]
    $setGlobalUserVar[money;$math[$getGlobalUserVar[money]+$truncate[$get[robAmt]]]]
    $setGlobalUserVar[money;$math[$getGlobalUserVar[money;$mentioned[1;false]]-$truncate[$get[robAmt]]];$mentioned[1;false]]

$let[robAmt;$math[$djsEval[Math.random() * (0.80 - 0.30) + 0.30;true]*$getGlobalUserVar[money;$mentioned[1;false]]]]

$else
    The rob failed! You compensated **$username[$mentioned[1;false]]** $numberSeparator[$truncate[$get[compAmt]];,]

$setGlobalUserVar[money;$math[$getGlobalUserVar[money]-$truncate[$get[compAmt]]]]
    $setGlobalUserVar[money;$math[$getGlobalUserVar[money;$mentioned[1;false]]+$truncate[$get[compAmt]]];$mentioned[1;false]]

$let[compAmt;$math[$djsEval[Math.random() * (0.35 - 0.15) + 0.15;true]*$math[$getGlobalUserVar[money]+$getGlobalUserVar[bank]]]]
$endif

$onlyIf[$getGlobaluserVar[money;$mentioned[1]]>5000;You cant rob a user who has money below 5000.]
    $onlyIf[$getGlobalUserVar[robbed;$mentioned[1;false]]<$datestamp;This user got robbed recently. You cannot rob them!]

$onlyIf[$authorID!=$mentioned[1;false];You can't rob yourself!]
    $onlyIf[$mentioned[1;false]!=undefined;Please mention a user to rob.]

`,
});
```

### Crime Command

```js
client.command({
  name: "crime",
  $if: "old",
  code: `
  $if[$random[1;10]<=4]
$title[$username]
$description[$randomText[You successfully robbed the bank!; You successfully murdered your in-laws!; You successfully jay-walked!; You successfully stole a game!]
You've gained **$random[300;500]**.]
$setGlobalUserVar[money;$math[$getGlobalUserVar[money]+$random[300;500]]]

$color[#00ff00]
  $elseif[$random[1;10]>=5]
$title[$username]
$description[You realized you're bad at crimes and lost money.
  You've lost ** -$random[100;300]\*\*.]
$setGlobalUserVar[money;$sub[$getGlobalUserVar[money];$random[100;300]]]
$color[#8B0000]

$endElseIf
$endif

$cooldown[10s;📅 | You can commit a felony again in \`%time%\`.]
`,
});
```

This code works best in version6.7.1
