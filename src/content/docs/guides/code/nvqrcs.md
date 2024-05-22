---
title: Welcome & Leave
description: Command to greet and farewell a user.
pagefind: false
sidebar:
  hidden: true
prev: false
next: false
---

Command to greet and farewell a user.

### Variables

```diff lang="js"
client.variables({
  logChannel: "",
  attribute:
    '{ "welcome_text2": "Welcome to {guild}", "welcome_text3": "You are our {count} member.", "welcome_fontColor": "00ffff", "leave_text2": "Goodbye From {guild}", "leave_text3": "We now have [count} members only.", "leave_fontColor": "00ffff"}',
  logImage:
    '{"welcome": "https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg", "leave": "https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg"}',
  welcomeLog: false,
  leaveLog: false,
});
```

### Welcome

```js
client.joinCommand({
  name: "join",
  channel: "$getGuildVar[logChannel]",
  code: `

  $sendMessage[{attachment:welcome.png:https#COLON#//api.aggelos-007.xyz/welcomecard?background=$getObjectProperty[image;welcome]&text1=$userName&text2=$replaceText[$replaceText[$getObjectProperty[attribute;welcome_text2];{guild};$guildName]; ;+]&text3=$replaceText[$replaceText[$getObjectProperty[attribute;welcome_text3];{count};$ordinal[$membersCount[$guildId]]]; ;+]&avatar=$authorAvatar&fontColor=$getObjectProperty[attribute;welcome_fontColor]}
  {newEmbed: {title:Welcome}
  {description:Welcome **$userName** to **$guildName**.\nWe hope you enjoy your stay here! We now have $membersCount[$guildId] members.}
  {image:attachment://welcome.png}
  {color:Green}
  {footer:Make sure to read the rules.}}]

  $createObject[attribute;$getGuildVar[attribute]]
  $createObject[image;$getGuildVar[logImage]]
  $onlyIf[$getGuildVar[welcomeLog]==true;]
  
  `,
});
```

### Leave

```js
client.leaveCommand({
  name: "leave",
  channel: "$getGuildVar[logChannel]",
  code: `
    $sendMessage[
    {attachment:leave.png:https#COLON#//api.aggelos-007.xyz/welcomecard?background=$getObjectProperty[image;leave]&text1=$userName&text2=$replaceText[$replaceText[$getObjectProperty[attribute;leave_text2];{guild};$guildName]; ;+]&text3=$replaceText[$replaceText[$getObjectProperty[attribute;leave_text3];{count};$membersCount[$guildId]]; ;+]&avatar=$authorAvatar&fontColor=$getObjectProperty[attribute;leave_fontColor]}
    {newEmbed: {title:Goodbye}
    {description: Goodbye **$userName** from **$guildName**. We hope you had enjoyed your stay when you were here! We now have become $membersCount members sadly.}
    {image:attachment://leave.png}
    {color:Red}
    {footer:We hope that you will return someday.}}]

    $createObject[attribute;$getGuildVar[attribute]]
    $createObject[image;$getGuildVar[logImage]]
    $onlyIf[$getGuildVar[leaveLog]==true;]
    `,
});
```

### Setup

```js
client.command({
  name: "setuplog",
  aliases: ["sl", "setlog"],
  code: `
  $sendMessage[{newEmbed:{title:Setup Log}{description: 
  **Channel\:** $ifAwaited[$getGuildVar[logChannel]!=;<#$getGuildVar[logChannel]>;Not set yet.]
  **Welcome Log\:** $ifAwaited[$getGuildVar[welcomeLog]==true;Enabled.;Disabled.]
  **Leave Log\:** $ifAwaited[$getGuildVar[leaveLog]==true;Enabled.;Disabled.]
  **Background for welcome\**: $ifAwaited[$getObjectProperty[image;welcome]==https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg;default.;\`$getObjectProperty[image;welcome]\`]
  **Background for leave\**: $ifAwaited[$getObjectProperty[image;leave]==https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg;default.;\`$getObjectProperty[image;leave]\`]}
  {color:Blurple}}
  {actionRow: {selectMenu:logSetupMenu_$authorID_channel:Chose the channel to log.:1:1:false:{channelInput}}}
  {actionRow:{button:$ifAwaited[$getGuildVar[welcomeLog]==true;Disable;Enable] the welcome log? :$ifAwaited[$getGuildVar[welcomeLog]==true;danger;success]:logSetup_$authorID_welcome:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:$ifAwaited[$getGuildVar[leaveLog]==true;Disable;Enable] the leave log?:$ifAwaited[$getGuildVar[leaveLog]==true;danger;success]:logSetup_$authorID_leave:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}}
  {actionRow:{button:Set Welcome Image Attribute:primary:logSetup_$authorID_config_welcome:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:Set Leave Image Attribute:primary:logSetup_$authorID_config_leave:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:Reset Background to default for welcome?:secondary:logSetup_$authorID_bgreset_welcome:$ifAwaited[$getGuildVar[logChannel]!=&&$getObjectProperty[image;welcome]!=https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg;false;true]}{button:Reset Background to default for leave?:secondary:logSetup_$authorID_bgreset_leave:$ifAwaited[$getGuildVar[logChannel]!=&&$getObjectProperty[image;leave]!=https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg;false;true]}}]
  
  
  $createObject[attribute;$getGuildVar[attribute]]
  $createObject[image;$getGuildVar[logImage]]
  $onlyPerms[manageguild;You need the Permission **Manage Server** in order to use this command. ]
  `,
});
```

### Interaction Command

```js
ahoemi.official
ahoemi.official
Idle

ahoemi.official
 —
Yesterday at 4:00 PM
Variables

client.variables({
  logChannel: "",
  attribute:
    '{ "welcome_text2": "Welcome to {guild}", "welcome_text3": "You are our {count} member.", "welcome_fontColor": "00ffff", "leave_text2": "Goodbye From {guild}", "leave_text3": "We now have [count} members only.", "leave_fontColor": "00ffff"}',
  logImage:
    '{"welcome": "https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg", "leave": "https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg"}',
  welcomeLog: false,
  leaveLog: false,
});

Welcome

client.joinCommand({
  name: "join",
  channel: "$getGuildVar[logChannel]",
  code: `

  $sendMessage[{attachment:welcome.png:https#COLON#//api.aggelos-007.xyz/welcomecard?background=$getObjectProperty[image;welcome]&text1=$userName&text2=$replaceText[$replaceText[$getObjectProperty[attribute;welcome_text2];{guild};$guildName]; ;+]&text3=$replaceText[$replaceText[$getObjectProperty[attribute;welcome_text3];{count};$ordinal[$membersCount[$guildId]]]; ;+]&avatar=$authorAvatar&fontColor=$getObjectProperty[attribute;welcome_fontColor]}
  {newEmbed: {title:Welcome}
  {description:Welcome **$userName** to **$guildName**.\nWe hope you enjoy your stay here! We now have $membersCount[$guildId] members.}
  {image:attachment://welcome.png}
  {color:Green}
  {footer:Make sure to read the rules.}}]

  $createObject[attribute;$getGuildVar[attribute]]
  $createObject[image;$getGuildVar[logImage]]
  $onlyIf[$getGuildVar[welcomeLog]==true;]

  `,
});

Leave

client.leaveCommand({
  name: "leave",
  channel: "$getGuildVar[logChannel]",
  code: `
    $sendMessage[
    {attachment:leave.png:https#COLON#//api.aggelos-007.xyz/welcomecard?background=$getObjectProperty[image;leave]&text1=$userName&text2=$replaceText[$replaceText[$getObjectProperty[attribute;leave_text2];{guild};$guildName]; ;+]&text3=$replaceText[$replaceText[$getObjectProperty[attribute;leave_text3];{count};$membersCount[$guildId]]; ;+]&avatar=$authorAvatar&fontColor=$getObjectProperty[attribute;leave_fontColor]}
    {newEmbed: {title:Goodbye}
    {description: Goodbye **$userName** from **$guildName**. We hope you had enjoyed your stay when you were here! We now have become $membersCount members sadly.}
    {image:attachment://leave.png}
    {color:Red}
    {footer:We hope that you will return someday.}}]

    $createObject[attribute;$getGuildVar[attribute]]
    $createObject[image;$getGuildVar[logImage]]
    $onlyIf[$getGuildVar[leaveLog]==true;]
    `,
});


Setup

client.command({
  name: "setuplog",
  aliases: ["sl", "setlog"],
  code: `
  $sendMessage[{newEmbed:{title:Setup Log}{description:
  **Channel\:** $ifAwaited[$getGuildVar[logChannel]!=;<#$getGuildVar[logChannel]>;Not set yet.]

Expand
message.txt3 KB
Interaction Buttons

client.interactionCommand({
  prototype: "button",
  $if: "old",
  code: `
    $interactionUpdate[;{newEmbed:{title:Setup Log}{description:
    **Channel\:** $ifAwaited[$getGuildVar[logChannel]!=;<#$getGuildVar[logChannel]>;Not set yet.]

Expand
message.txt6 KB
Configure Channel

client.interactionCommand({
  prototype: "selectMenu",
  code: `
    $interactionUpdate[;{newEmbed:{title:Setup Log}{description:
    **Channel\:** $ifAwaited[$getGuildVar[logChannel]!=;<#$getGuildVar[logChannel]>;Not set yet.]
    **Welcome Log\:** $ifAwaited[$getGuildVar[welcomeLog]==true;Enabled.;Disabled.]

Expand
message.txt3 KB
Configure Welcome Image

client.interactionCommand({
  name: "welcomeLogConfig",
  prototype: "modal",
  code: `
    $interactionUpdate[;{newEmbed:{title:Setup Log}{description:
    **Channel\:** $ifAwaited[$getGuildVar[logChannel]!=;<#$getGuildVar[logChannel]>;Not set yet.]

Expand
message.txt3 KB
Configure Leave Image

client.interactionCommand({
  name: "leaveLogConfig",
  prototype: "modal",
  code: `
    $interactionUpdate[;{newEmbed:{title:Setup Log}{description:
    **Channel\:** $ifAwaited[$getGuildVar[logChannel]!=;<#$getGuildVar[logChannel]>;Not set yet.]

Expand
message.txt3 KB
﻿

client.interactionCommand({
  prototype: "button",
  $if: "old",
  code: `
    $interactionUpdate[;{newEmbed:{title:Setup Log}{description:
    **Channel\:** $ifAwaited[$getGuildVar[logChannel]!=;<#$getGuildVar[logChannel]>;Not set yet.]
    **Welcome Log\:** $ifAwaited[$getGuildVar[welcomeLog]==true;Enabled.;Disabled.]
    **Leave Log\:** $ifAwaited[$getGuildVar[leaveLog]==true;Enabled.;Disabled.]
    **Background for welcome\**: $ifAwaited[$getObjectProperty[image;welcome]==https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg;default.;\`$getObjectProperty[image;welcome]\`]
    **Background for leave\**: $ifAwaited[$getObjectProperty[image;leave]==https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg;default.;\`$getObjectProperty[image;leave]\`]}
    {color:Blurple}};
    {actionRow: {selectMenu:logSetupMenu_$authorID_channel:Chose the channel to log.:1:1:false:{channelInput}}}
    {actionRow:{button:$ifAwaited[$getGuildVar[welcomeLog]==true;Disable;Enable] the welcome log? :$ifAwaited[$getGuildVar[welcomeLog]==true;danger;success]:logSetup_$authorID_welcome:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:$ifAwaited[$getGuildVar[leaveLog]==true;Disable;Enable] the leave log?:$ifAwaited[$getGuildVar[leaveLog]==true;danger;success]:logSetup_$authorID_leave:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}}
    {actionRow:{button:Set Welcome Image Attribute:primary:logSetup_$authorID_config_welcome:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:Set Leave Image Attribute:primary:logSetup_$authorID_config_leave:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:Reset Background to default for welcome?:secondary:logSetup_$authorID_bgreset_welcome:$ifAwaited[$getGuildVar[logChannel]!=&&$getObjectProperty[image;welcome]!=https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg;false;true]}{button:Reset Background to default for leave?:secondary:logSetup_$authorID_bgreset_leave:$ifAwaited[$getGuildVar[logChannel]!=&&$getObjectProperty[image;leave]!=https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg;false;true]}}]
    $onlyIf[$advancedTextSplit[$interactionData[customId];_;3]!=config;]

    $if[$advancedTextSplit[$interactionData[customId];_;3]==welcome]
    $setGuildVar[welcomeLog;$ifAwaited[$getGuildVar[welcomeLog]==true;false;true]]

    $elseif[$advancedTextSplit[$interactionData[customId];_;3]==leave]
    $setGuildVar[leaveLog;$ifAwaited[$getGuildVar[leaveLog]==true;false;true]]
    $endelseif

    $elseif[$advancedTextSplit[$interactionData[customId];_;3]==config]
    $if[$advancedTextSplit[$interactionData[customId];_;4]==welcome]
    $interactionModal[Welcome Image Configuration;welcomeLogConfig;
      {actionRow:{textInput:text2:1:text2:false:$getObjectProperty[attribute;welcome_text2]:0:4000:$getObjectProperty[attribute;welcome_text2]}}
      {actionRow:{textInput:text3:1:text3:false:$getObjectProperty[attribute;welcome_text3]:0:4000:$getObjectProperty[attribute;welcome_text3]}}
      {actionRow:{textInput:font color:1:color:false:$getObjectProperty[attribute;welcome_fontColor]:0:4000:$getObjectProperty[attribute;welcome_fontColor]}}
      {actionRow:{textInput:background URL:2:customBg:false:https#COLON#example.com/image.png:0:4000:$getObjectProperty[image;welcome]}}
    ]
    $elseif[$advancedTextSplit[$interactionData[customId];_;4]==leave]
    $interactionModal[Custom Background for leave;leaveLogConfig;
      {actionRow:{textInput:text2:1:text2:false:$getObjectProperty[attribute;leave_text2]:0:4000:$getObjectProperty[attribute;leave_text2]}}
      {actionRow:{textInput:text3:1:text3:false:$getObjectProperty[attribute;leave_text3]:0:4000:$getObjectProperty[attribute;leave_text3]}}
      {actionRow:{textInput:font color:1:color:false:$getObjectProperty[attribute;leave_fontColor]:0:4000:$getObjectProperty[attribute;leave_fontColor]}}
      {actionRow:{textInput:background URL:2:customBg:false:https#COLON#example.com/image.png:0:4000:$getObjectProperty[image;leave]}}
    ]
    $endelseif
    $endif
    $endelseif

    $elseif[$advancedTextSplit[$interactionData[customId];_;3]==bgreset]
    $setGuildVar[logImage;$getObject[image]]
    $if[$advancedTextSplit[$interactionData[customId];_;4]==welcome]
    $setObjectProperty[image;welcome;https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg]
    $elseif[$advancedTextSplit[$interactionData[customId];_;4]==leave]
    $setObjectProperty[image;leave;https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg]
    $endelseif
    $endif
    $endelseif
    $endif

    $createObject[attribute;$getGuildVar[attribute]]
    $createObject[image;$getGuildVar[logImage]]

    $onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];You're not the author of this command!{ephemeral}{interaction}]
    $onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==logSetup;]
    `,
});
```

### Configure Channel

```js
client.interactionCommand({
  prototype: "selectMenu",
  code: `
    $interactionUpdate[;{newEmbed:{title:Setup Log}{description: 
    **Channel\:** $ifAwaited[$getGuildVar[logChannel]!=;<#$getGuildVar[logChannel]>;Not set yet.]
    **Welcome Log\:** $ifAwaited[$getGuildVar[welcomeLog]==true;Enabled.;Disabled.]
    **Leave Log\:** $ifAwaited[$getGuildVar[leaveLog]==true;Enabled.;Disabled.]
    **Background for welcome\**: $ifAwaited[$getObjectProperty[image;welcome]==https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg;default.;\`$getObjectProperty[image;welcome]\`]
    **Background for leave\**: $ifAwaited[$getObjectProperty[image;leave]==https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg;default.;\`$getObjectProperty[image;leave]\`]}
    {color:Blurple}};
    {actionRow: {selectMenu:logSetupMenu_$authorID_channel:Chose the channel to log.:1:1:false:{channelInput}}}
    {actionRow:{button:$ifAwaited[$getGuildVar[welcomeLog]==true;Disable;Enable] the welcome log? :$ifAwaited[$getGuildVar[welcomeLog]==true;danger;success]:logSetup_$authorID_welcome:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:$ifAwaited[$getGuildVar[leaveLog]==true;Disable;Enable] the leave log?:$ifAwaited[$getGuildVar[leaveLog]==true;danger;success]:logSetup_$authorID_leave:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}}
    {actionRow:{button:Set Welcome Image Attribute:primary:logSetup_$authorID_config_welcome:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:Set Leave Image Attribute:primary:logSetup_$authorID_config_leave:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:Reset Background to default for welcome?:secondary:logSetup_$authorID_bgreset_welcome:$ifAwaited[$getGuildVar[logChannel]!=&&$getObjectProperty[image;welcome]!=https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg;false;true]}{button:Reset Background to default for leave?:secondary:logSetup_$authorID_bgreset_leave:$ifAwaited[$getGuildVar[logChannel]!=&&$getObjectProperty[image;leave]!=https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg;false;true]}}]
    $createObject[image;$getGuildVar[logImage]]
    $setGuildVar[logChannel;$interactionData[values[0]]]
    $onlyIf[$channelType[$interactionData[values[0]]]==text;Chose a valid **text channel**.{ephemeral}{interaction}]
    $onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];You're not the author of this command!{ephemeral}{interaction}]
    $onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==logSetupMenu;]
    `,
});
```

### Configure Welcome Image

```js
client.interactionCommand({
  name: "welcomeLogConfig",
  prototype: "modal",
  code: `
    $interactionUpdate[;{newEmbed:{title:Setup Log}{description:
    **Channel\:** $ifAwaited[$getGuildVar[logChannel]!=;<#$getGuildVar[logChannel]>;Not set yet.]
    **Welcome Log\:** $ifAwaited[$getGuildVar[welcomeLog]==true;Enabled.;Disabled.]
    **Leave Log\:** $ifAwaited[$getGuildVar[leaveLog]==true;Enabled.;Disabled.]
    **Background for welcome\**: $ifAwaited[$getObjectProperty[image;welcome]==https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg;default.;\`$getObjectProperty[image;welcome]\`]
    **Background for leave\**: $ifAwaited[$getObjectProperty[image;leave]==https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg;default.;\`$getObjectProperty[image;leave]\`]}
    {color:Blurple}};
    {actionRow: {selectMenu:logSetupMenu_$authorID_channel:Chose the channel to log.:1:1:false:{channelInput}}}
    {actionRow:{button:$ifAwaited[$getGuildVar[welcomeLog]==true;Disable;Enable] the welcome log? :$ifAwaited[$getGuildVar[welcomeLog]==true;danger;success]:logSetup_$authorID_welcome:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:$ifAwaited[$getGuildVar[leaveLog]==true;Disable;Enable] the leave log?:$ifAwaited[$getGuildVar[leaveLog]==true;danger;success]:logSetup_$authorID_leave:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}}
    {actionRow:{button:Set Welcome Image Attribute:primary:logSetup_$authorID_config_welcome:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:Set Leave Image Attribute:primary:logSetup_$authorID_config_leave:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:Reset Background to default for welcome?:secondary:logSetup_$authorID_bgreset_welcome:$ifAwaited[$getGuildVar[logChannel]!=&&$getObjectProperty[image;welcome]!=https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg;false;true]}{button:Reset Background to default for leave?:secondary:logSetup_$authorID_bgreset_leave:$ifAwaited[$getGuildVar[logChannel]!=&&$getObjectProperty[image;leave]!=https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg;false;true]}}]
    
    $setGuildVar[logImage;$getObject[image]]
    $setGuildVar[attribute;$getObject[attribute]]


    $setObjectProperty[image;welcome;$textInputValue[customBg]]

    $setObjectProperty[attribute;welcome_text2;$textInputValue[text2]]
    $setObjectProperty[attribute;welcome_text3;$textInputValue[text3]]
    $setObjectProperty[attribute;welcome_fontColor;$textInputValue[color]]
    
    $createObject[attribute;$getGuildVar[attribute]]
    $createObject[image;$getGuildVar[logImage]]

    $onlyIf[$isValidImageLink[$textInputValue[customBg]]==true; Please put a valid image link next time.{interaction}{ephemeral}]
    `,
});
```

### Configure Leave Image

```js
client.interactionCommand({
  name: "leaveLogConfig",
  prototype: "modal",
  code: `
    $interactionUpdate[;{newEmbed:{title:Setup Log}{description:
    **Channel\:** $ifAwaited[$getGuildVar[logChannel]!=;<#$getGuildVar[logChannel]>;Not set yet.]
    **Welcome Log\:** $ifAwaited[$getGuildVar[welcomeLog]==true;Enabled.;Disabled.]
    **Leave Log\:** $ifAwaited[$getGuildVar[leaveLog]==true;Enabled.;Disabled.]
    **Background for welcome\**: $ifAwaited[$getObjectProperty[image;welcome]==https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg;default.;\`$getObjectProperty[image;welcome]\`]
    **Background for leave\**: $ifAwaited[$getObjectProperty[image;leave]==https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg;default.;\`$getObjectProperty[image;leave]\`]}
    {color:Blurple}};
    {actionRow: {selectMenu:logSetupMenu_$authorID_channel:Chose the channel to log.:1:1:false:{channelInput}}}
    {actionRow:{button:$ifAwaited[$getGuildVar[welcomeLog]==true;Disable;Enable] the welcome log? :$ifAwaited[$getGuildVar[welcomeLog]==true;danger;success]:logSetup_$authorID_welcome:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:$ifAwaited[$getGuildVar[leaveLog]==true;Disable;Enable] the leave log?:$ifAwaited[$getGuildVar[leaveLog]==true;danger;success]:logSetup_$authorID_leave:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}}
    {actionRow:{button:Set Welcome Image Attribute:primary:logSetup_$authorID_config_welcome:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:Set Leave Image Attribute:primary:logSetup_$authorID_config_leave:$ifAwaited[$getGuildVar[logChannel]!=;false;true]}{button:Reset Background to default for welcome?:secondary:logSetup_$authorID_bgreset_welcome:$ifAwaited[$getGuildVar[logChannel]!=&&$getObjectProperty[image;welcome]!=https://as2.ftcdn.net/v2/jpg/02/97/79/83/1000_F_297798377_VB9egqGnRKcZxU53wybEHLRnnTrcvlAH.jpg;false;true]}{button:Reset Background to default for leave?:secondary:logSetup_$authorID_bgreset_leave:$ifAwaited[$getGuildVar[logChannel]!=&&$getObjectProperty[image;leave]!=https://as2.ftcdn.net/v2/jpg/03/26/10/71/1000_F_326107172_lm2Lh7xYCHrrB7miReEbai5zoMeLAPwm.jpg;false;true]}}]
    
    $setGuildVar[logImage;$getObject[image]]
    $setGuildVar[attribute;$getObject[attribute]]

    $setObjectProperty[image;leave;$textInputValue[customBg]]

    $setObjectProperty[attribute;leave_text2;$textInputValue[text2]]
    $setObjectProperty[attribute;leave_text3;$textInputValue[text3]]
    $setObjectProperty[attribute;leave_fontColor;$textInputValue[color]]
    
    $createObject[attribute;$getGuildVar[attribute]]
    $createObject[image;$getGuildVar[logImage]]
    $onlyIf[$isValidImageLink[$textInputValue[customBg]]==true; Please put a valid image link next time.{interaction}{ephemeral}]
    `,
});
```

This code works best in version6.7.1
