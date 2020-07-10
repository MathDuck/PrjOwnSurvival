const serverQueryFactory = require("../../factories/serverQueryFactory");

module.exports.run = async (client, message, args) => {
  if (message.deletable) message.delete();

  if (!args[0]) {
    return message
      .reply(`oublie pas le message de statut.`)
      .then((m) => m.delete({ timeout: 5000 }));
  }

  const statusMessage = args.join(" ");

  if (!statusMessage || statusMessage === "")
    return message
      .reply(`il y a un petit soucis avec ton message.`)
      .then((m) => m.delete({ timeout: 5000 }));

  client.user
    .setPresence({
      activity: { name: statusMessage, type: "WATCHING" },
      status: "online",
    })
    .catch(console.error);
};

module.exports.help = {
  name: "status",
  description: "Permet de changer le message du statut du bot",
  usage: "<message>",
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
