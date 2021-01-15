module.exports.run = async (client, message, args) => {
  if (message.deletable) message.delete();

  message.channel.send(
    `https://gfycat.com/infinitefloweryhadrosaurus`
  );
};

module.exports.help = {
  name: "enderman",
  aliases: ["ender"],
  description: "Envoie un gif d'un enderman pas content.",
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
