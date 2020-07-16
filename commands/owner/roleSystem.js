const serverQueryFactory = require("../../factories/serverQueryFactory");

module.exports.run = async (client, message, args) => {
  if (message.deletable) message.delete();

  if (!args[0])
    return message
      .reply(`Merci de ne pas oublier de spécifier l'id du rôle.`)
      .then((m) => m.delete({ timeout: 5000 }));

  const roleId = args[0];

  if (roleId !== "0") {
    if (isNaN(roleId)) {
      return message
        .reply(`l'ID du rôle spécifié n'est pas valide.`)
        .then((m) => m.delete({ timeout: 5000 }));
    }

    message.guild.roles
      .fetch(roleId)
      .then((role) => {
        message.channel
          .send(`**Pour obtenir le rôle "${role.name}", clique sur ✅ !**`)
          .then((m) => {
            m.react("✅");
            serverQueryFactory
              .buildRoleSystemQuery(client)
              .run(message.guild.id, m.id, role.id);
          });
      })
      .catch((error) => {
        return message
          .reply(
            `Le rôle ${args[0]} n'existe pas. Merci de vérifier. (Erreur: ${error})`
          )
          .then((m) => m.delete({ timeout: 5000 }));
      });
  }
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
