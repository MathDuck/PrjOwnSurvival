const serverQueryFactory = require("../../factories/serverQueryFactory");

module.exports.run = async (client, message, args) => {
  if (message.deletable) message.delete();

  if (!args[0]) {
    const checkServerData = await serverQueryFactory
      .checkDataQuery(client)
      .get(message.guild.id);

    return message
      .reply(`merci de spécifier l'ID du channel de logs.`)
      .then((m) => m.delete({ timeout: 5000 }));
  }

  const logChannelId = args[0];

  if (logChannelId !== "0") {
    if (isNaN(logChannelId)) {
      return message
        .reply(`le channel spécifié n'est pas valide.`)
        .then((m) => m.delete({ timeout: 5000 }));
    }

    client.channels
      .fetch(logChannelId)
      .then((channel) =>
        message
          .reply(`le channel ${channel.name} est désormais le channel de logs.`)
          .then((msg) => msg.delete({ timeout: 4000 }))
      );
  } else {
    message
      .reply(`le channel log est désactivé.`)
      .then((m) => m.delete({ timeout: 5000 }));
  }

  await serverQueryFactory
    .updateLogChannelQuery(client)
    .run(logChannelId, message.guild.id);
};

module.exports.help = {
  name: "log",
  aliases: ["setlog"],
  description: "Permet de spécifier le channel de logs. (0 pour désactiver)",
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
