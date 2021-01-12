module.exports.run = async (client, message, args) => {
  if (message.deletable) message.delete();

  message.channel.send(
    `https://tenor.com/view/creeper-blast-creeper-blast-minecraft-gaming-gif-16908378`
  );
};

module.exports.help = {
  name: "creeper",
  aliases: ["creep"],
  description: "Envoie un gif d'un creeper qui explose.",
  usage: "",
  category: "Fun",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 2,
  cooldown: 30 * 1000,
};
