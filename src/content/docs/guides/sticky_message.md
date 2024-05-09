---
title: Sticky Message
description: Command to send a message each time any user sends a message.
---

Command to send a message each time any user sends a message.

**Credit**: [ahoemi.offficial](https://discord.com/users/769525910164471821)

### Variables

```js
client.variables({
  stickyMessageID: "",
  temporaryStickyMessage: "",
});
```

### Main Code

```js
client.command({
  name: "$alwaysExecute",
  $if: "old",
  code: `
$if[$getChannelVar[stickyMessageID;$channelID]!=&&$messageExists[$getChannelVar[stickyMessageID;$channelID];$channelID]==true]
$setChannelVar[stickyMessageID;$sendMessage[$get[m];true];$channelID]
$deleteMessage[$getChannelVar[stickyMessageID;$channelID];$channelID]
$let[m;$getMessage[$channelID;$getChannelVar[stickyMessageID;$channelID];content]]
$else
$setChannelVar[stickyMessageID;;$channelID]
$endif
$cooldown[100ms]
$suppressErrors[Some thing went wrong. {deleteIn:5s}]
`,
});
```

### Setup code #1

```js
client.command({
  name: "stickymessage",
  code: `
$setMessageVar[temporaryStickyMessage;$message;$sendMessage[{newEmbed: {title: Sticky Message} {description: $if[$getChannelVar[stickyMessageID]!=;You already have a sticky message set for this channel, d;D]o you $if[$getChannelVar[stickyMessageID]!=;still ]confirm to set this message "\`$message\`" as the sticky message for this channel?} {color: $if[$getChannelVar[stickyMessageID]==;Green;Red]}} {actionRow:{button:Confirm:success:stickyMessageConfirm_$authorID} {button:Cancel:danger:stickyMessageCancel_$authorID}};true]]

$argsCheck[>0;Please type a sticky message along with it.]

$onlyPerms[manageguild;You are required to have the permission **\`Manage Server\`**.]
`,
});
```

### Setup code #2

```js
client.interactionCommand({
  prototype: "button",
  code: `
$deleteMessage[$interactionData[message.id];$interactionData[channel.id]]
$wait[10s]

$setChannelVar[stickyMessageID;$sendMessage[$getMessageVar[temporaryStickyMessage;$interactionData[message.id]];true]]

$interactionReply[The following message is the sticky message. Don't delete it unless you want to stop the sticky message system.;;;;all;true]

$editMessage[$interactionData[message.id];Confirmed. Auto-deleting this message in 10 seconds... {newEmbed: {title: Sticky Message} {description: $if[$getChannelVar[stickyMessageID]!=;You already have a sticky message set for this channel, d;D]o you $if[$getChannelVar[stickyMessageID]!=;still ]confirm to set this message "\`$getMessageVar[temporaryStickyMessage;$interactionData[message.id]]\`" as the sticky message for this channel?} {color: $if[$getChannelVar[stickyMessageID]==;Green;Red]}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];You're not the author of this command!{ephemeral}{interaction}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==stickyMessageConfirm;] 
`,
});
```

### Setup code #3

```js
client.interactionCommand({
  prototype: "button",
  code: `
$deleteMessage[$interactionData[message.id];$interactionData[channel.id]]
$wait[10s]

$interactionUpdate[Cancelled. Auto-deleting this message in 10 seconds...;{newEmbed: {title: Sticky Message} {description: $if[$getChannelVar[stickyMessageID]!=;You already have a sticky message set for this channel, d;D]o you $if[$getChannelVar[stickyMessageID]!=;still ]confirm to set this message "\`$getMessageVar[temporaryStickyMessage;$interactionData[message.id]]\`" as the sticky message for this channel?} {color: $if[$getChannelVar[stickyMessageID]==;Green;Red]}}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];You're not the author of this command!{ephemeral}{interaction}]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==stickyMessageCancel;]
`,
});
```

This code works best in version6.7.1
