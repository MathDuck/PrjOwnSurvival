const serverQueryFactory = require("../../factories/serverQueryFactory");

module.exports.run = async (client, message, args) => {
  if (message.deletable) message.delete();

  if (!args[0]) {
    const checkServerData = await serverQueryFactory
      .checkDataQuery(client)
      .get(message.guild.id);

    return message
      .reply(`merci de spécifier l'ID du channel général.`)
      .then((m) => m.delete({ timeout: 5000 }));
  }

  const generalChannelId = args[0];

  if (generalChannelId !== "0") {
    if (isNaN(generalChannelId)) {
      return message
        .reply(`le channel spécifié n'est pas valide.`)
        .then((m) => m.delete({ timeout: 5000 }));
    }

    client.channels
      .fetch(generalChannelId)
      .then((channel) =>
        message
          .reply(`le channel ${channel.name} est désormais le channel général.`)
          .then((msg) => msg.delete({ timeout: 4000 }))
      );
  } else {
    message
      .reply(`le channel général est désactivé.`)
      .then((m) => m.delete({ timeout: 5000 }));
  }

  await serverQueryFactory
    .updateGeneralChannelQuery(client)
    .run(generalChannelId, message.guild.id);
};

module.exports.help = {
  name: "general",
  aliases: ["setgeneral"],
  description:
    "Permet de spécifier le channel de discussion général. (0 pour désactiver)",
  usage: "<ChannelId>",
  category: "Gestion",
};

module.exports.requirements = {
  userPerms: ["ADMINISTRATOR"],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 30 * 1000,
};
