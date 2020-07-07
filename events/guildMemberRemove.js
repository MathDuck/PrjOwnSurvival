const serverQueryFactory = require("../factories/serverQueryFactory");
const { MessageEmbed } = require("discord.js");
const dateFormat = require("../functions/dateFormat");

module.exports = async (client, member) => {
  if (!member) return;
  if (member.user.bot) return;

  const checkServerData = await serverQueryFactory
    .checkDataQuery(client)
    .get(member.guild.id);

  const logChannelId = checkServerData.log_channel_id;
  if (logChannelId === "0") return;

  client.channels
    .fetch(logChannelId)
    .then((channel) => {
      const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.avatarURL())
        .setDescription(`**<@${member.id}> a quitté le serveur discord...**`)
        .addField(
          "**Date de départ:**",
          `${dateFormat.getFullDate(Date.now())}`
        )
        .setFooter(`Member ID: ${member.id}`)
        .setTimestamp()
        .setColor("RED");

      return channel.send(embed);
    })
    .catch((error) => {
      console.log(`Impossible de trouver le channel de logs. / ${error}`);
    });
};
