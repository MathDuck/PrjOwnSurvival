const serverQueryFactory = require("../../factories/serverQueryFactory");

module.exports.run = async (client, message, args) => {
  if (message.deletable) message.delete();

  if (!args[0])
    return message
      .reply(`Merci de ne pas oublier de spécifier le rôle.`)
      .then((m) => m.delete({ timeout: 5000 }));

  let role = message.guild.roles.cache.find(
    (r) => r.name.toLowerCase() === args[0].toLowerCase()
  );

  if (!role)
    return message
      .reply(`Le rôle ${args[0]} n'existe pas. Merci de vérifier.`)
      .then((m) => m.delete({ timeout: 5000 }));

  await message.channel
    .send(`**Pour obtenir le rôle "${role.name}", clique sur ✅ !**`)
    .then((m) => {
      m.react("✅");
      serverQueryFactory
        .buildRoleSystemQuery(client)
        .run(message.guild.id, m.id, role.id);
    });
};

module.exports.help = {
  name: "role",
  aliases: ["setrole"],
  description: "Permet de créer un auto-rôle",
  usage: "<#RoleName>",
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
