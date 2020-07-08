const serverQueryFactory = require("../factories/serverQueryFactory");
const { MessageEmbed } = require("discord.js");

module.exports = async (client, oldMessage, newMessage) => {
  if (oldMessage.partial) return;
  if (newMessage.author.id === client.user.id) return;

  const checkServerData = await serverQueryFactory
    .checkDataQuery(client)
    .get(newMessage.guild.id);

  const logChannelId = checkServerData.log_channel_id;
  if (logChannelId === "0") return;

  client.channels.fetch(logChannelId).then((channel) => {
    const embed = new MessageEmbed()
      .setAuthor(newMessage.author.tag, newMessage.author.avatarURL())
      .setDescription(
        `:keyboard: **Le [message](${newMessage}) envoyé par <@${newMessage.author.id}> a été modifié dans le channel <#${newMessage.channel.id}>**.`
      )
      .addField("**Ancien Message**", `${oldMessage}`)
      .addField("**Nouveau Message**", `${newMessage}`)
      .setFooter(
        `Author ID: ${newMessage.author.id} | Message ID: ${newMessage.id}`
      )
      .setTimestamp()
      .setColor("BLUE");

    return channel.send(embed);
  });
};
