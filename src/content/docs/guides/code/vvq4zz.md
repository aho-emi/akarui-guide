---
title: Starboard
description: Utility command
pagefind: false
sidebar:
  hidden: true
prev: false
next: false
---

Starboard command to pin a message by reacting on it.

### Variables

```js
client.variables({
  starChannel: "",
  starLog: false,
  starEmoji: "⭐",
});
```

### Starboard Menu

```js
client.command({
  name: "starboard",
  code: `
    $sendMessage[{newEmbed:{title:Starboard Configuration}{color:Blurple}{description:
    **Channel:** $nonEscape[$if[$getGuildVar[starChannel]==;Not set yet;<#$getGuildVar[starChannel]>]]
    **Starboard Log:** $ifAwaited[$getGuildVar[starLog]==true;Enabled;Disabled]
    **Emoji:** $getGuildVar[starEmoji]}}
    {actionRow: {selectMenu:starConfig_$authorID_channel:Chose the channel to log.:1:1:false:{channelInput}}}
    {actionRow:{button:$if[$getGuildVar[starLog]==true;Disable;Enable] the Starboard log? :$if[$getGuildVar[starLog]==true;danger;success]:starConfig_$authorID_star:$ifAwaited[$getGuildVar[starChannel]!=;false;true]}{button:Change Starboard Emoji:secondary:starConfig_$authorID_emoji:$ifAwaited[$getGuildVar[starChannel]!=;false;true]}}]`,
});
```

### Set Channel

```js
client.interactionCommand({
  prototype: "selectMenu",
  code: `
$interactionUpdate[;{newEmbed:{title:Starboard Configuration}{color:Blurple}{description:
      **Channel:** $nonEscape[$if[$getGuildVar[starChannel]==;Not set yet;<#$getGuildVar[starChannel]>]]
**Starboard Log:** $ifAwaited[$getGuildVar[starLog]==true;Enabled;Disabled]
**Emoji:** $getGuildVar[starEmoji]}};
      {actionRow: {selectMenu:starConfig_$authorID*channel:Chose the channel to log.:1:1:false:{channelInput}}}
{actionRow:{button:$if[$getGuildVar[starLog]==true;Disable;Enable] the Starboard log? :$if[$getGuildVar[starLog]==true;danger;success]:starConfig*$authorID_star:$ifAwaited[$getGuildVar[starChannel]!=;false;true]}{button:Change Starboard Emoji:secondary:starConfig_$authorID_emoji:$ifAwaited[$getGuildVar[starChannel]!=;false;true]}}]

    $setGuildVar[starChannel;$interactionData[values[0]]]
    $onlyIf[$channelType[$interactionData[values[0]]]==text;Chose a valid **text channel**.{ephemeral}{interaction}]
    $onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];You're not the author of this command!{ephemeral}{interaction}]
    $onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==starConfig;]
    `,
});
```

### Config Buttons

```js
client.interactionCommand({
  prototype: "button",
  $if: "old",
  code: `
  $interactionUpdate[;{newEmbed:{title:Starboard Configuration}{color:Blurple}{description:
    **Channel:** $nonEscape[$ifAwaited[$getGuildVar[starChannel]==;Not set yet;<#$getGuildVar[starChannel]>]]
**Starboard Log:** $ifAwaited[$getGuildVar[starLog]==true;Enabled;Disabled]
**Emoji:** $getGuildVar[starEmoji]}};
    {actionRow: {selectMenu:starConfig_$authorID*channel:Chose the channel to log.:1:1:false:{channelInput}}}
{actionRow:{button:$ifAwaited[$getGuildVar[starLog]==true;Disable;Enable] the Starboard log? :$ifAwaited[$getGuildVar[starLog]==true;danger;success]:starConfig*$authorID_star:$ifAwaited[$getGuildVar[starChannel]!=;false;true]}{button:Change Starboard Emoji:secondary:starConfig_$authorID*emoji:$ifAwaited[$getGuildVar[starChannel]!=;false;true]}}]
$onlyIf[$advancedTextSplit[$interactionData[customId];*;3]!=emoji]

    $if[$advancedTextSplit[$interactionData[customId];_;3]==star]
    $setGuildVar[starLog;$ifAwaited[$getGuildVar[starLog]==true;false;true]]

    $elseif[$advancedTextSplit[$interactionData[customId];_;3]==emoji]
    $setGuildVar[starEmoji;$djsEval[(async (d) => {
        async function firstReaction(message, channel, timeout = 60000) {
            await d.data.interaction.reply(message);
            const sentMessage = (await d.data.interaction?.fetchReply())

            return new Promise((resolve) => {
                const reactionFilter = (reaction, user) => !user.bot;

                const reactionListener = async (reaction, user) => {
                    if (reaction.message.id === sentMessage?.id && reactionFilter(reaction, user)) {
                      if (reaction.emoji.animated) return sentMessage.edit("You can't use animated emoji.");
                        const emoji = reaction.emoji.guild ? \`<:\${reaction.emoji.name}:\${reaction.emoji.id}>\` : reaction.emoji.name;
                        resolve(emoji);
                        sentMessage.reactions.removeAll().catch(console.error);
                        client.off('messageReactionAdd', reactionListener);
                        sentMessage.edit(\`Okay! Using \${emoji} as starboard emoji.\`);
                    }
                };

                const client = channel.client;
                client.on('messageReactionAdd', reactionListener);

                setTimeout(() => {
                    resolve(null);
                    client.off('messageReactionAdd', reactionListener);
                }, timeout);
            });
        }

        const channel = d.message.channel;
        const reaction = await firstReaction("React with any emoji to set it as starboard emoji", channel);

        return reaction;
    })(d);true]]
    $endelseif
    $endif

    $onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];You're not the author of this command!{ephemeral}{interaction}]
    $onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==starConfig;]
    `,
});
```

### Final Code

```js
client.reactionAddCommand({
  name: "starboard",
  channel: "$getGuildVar[starChannel]",
  code: `
  $djsEval[(async (d) => {
    const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
    const emoji = "$getGuildVar[starEmoji]"
const lastEmoji = d.message.reactions.cache.last()?.emoji;
const reactionCount = d.message.reactions.cache.reduce((c, r) => {
if (r.emoji.name == lastEmoji.name || r.emoji.id == lastEmoji.id) {
return (r.emoji.name == emoji || r.emoji.id == emoji.split(":")[2]?.slice(0, -1)) ? c + r.count : c;
} else {
return c;
}
}, 0);
if (reactionCount == 1 ) {

      const embed = new EmbedBuilder()
      .setAuthor({name: d.message.author.username, iconURL: d.message.author.displayAvatarURL({size: Number(512)}) })
      .setColor("#f1c40f")
      .setTitle("Starboard")
      .setURL(d.message.url)

      d.message.content ? embed.setDescription(d.message.content) : null;

      const attachment = d.message.attachments?.first();
      attachment ? embed.setImage(attachment.url) : null;

      const row = new ActionRowBuilder()
      .addComponents([
          new ButtonBuilder()
              .setCustomId('star')
              .setLabel(reactionCount.toString())
              .setStyle(2)
              .setDisabled(true)
              .setEmoji("$getGuildVar[starEmoji]"),
          new ButtonBuilder()
              .setURL(d.message.url)
              .setLabel('Message')
              .setStyle(5)]);

      const channel = d.guild.channels.cache.get("$getGuildVar[starChannel]");
      channel.send({embeds: [embed], components: [row]})
    }
    })(d);]

$onlyIf[$getGuildVar[starLog]==true;]
`,
});
```

This code works best in version 6.7.1
