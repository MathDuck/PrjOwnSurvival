const serverQueryFactory = require("../factories/serverQueryFactory");
const { MessageEmbed } = require("discord.js");
const dateFormat = require("../functions/dateFormat");

module.exports = async (client, message) => {
  if (message.partial) return;
  if (message.author.bot) return;
  if (!message || message.content === "") return;
  if (message.content.startsWith("!")) return;

  const checkServerData = await serverQueryFactory
    .checkDataQuery(client)
    .get(message.guild.id);

  const logChannelId = checkServerData.log_channel_id;
  if (logChannelId === "0") return;

  client.channels
    .fetch(logChannelId)
    .then((channel) => {
      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(
          `**Le message envoyé par <@${message.author.id}> a été supprimé dans le channel <#${message.channel.id}>**\n${message.content}`
        )
        .addField(
          "**Date du message**",
          `${dateFormat.getFullDate(Date.now())}`
        )
        .setFooter(
          `Author ID: ${message.author.id} | Message ID: ${message.id}`
        )
        .setTimestamp()
        .setColor("RED");

      return channel.send(embed);
    })
    .catch((error) => {
      console.log(`Impossible de trouver le channel. / ${error}`);
    });
};
