module.exports.run = async (client, message, args) => {
  let member = message.mentions.members.first();

  if (!args[0]) member = message.member;

  if (!member) {
    if (message.deletable) message.delete();
    return message
      .reply(`impossible de trouver ${args[0]}`)
      .then((msg) => msg.delete({ timeout: 2000 }));
  }

  message.channel.send(
    `:frame_photo: **${message.author.username}**, Voici l'avatar de ${
      member.user.tag
    }:\n${member.user.avatarURL({
      format: "png",
      dynamid: true,
      size: 4096,
    })}`
  );
};

module.exports.help = {
  name: "pp",
  aliases: ["photo"],
  description: "Permet de voir la photo d'un utilisateur en grand",
  usage: "<@Utilisateur>",
  category: "Fun",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 1,
  cooldown: 30 * 1000,
};
