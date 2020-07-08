const serverQueryFactory = require("../factories/serverQueryFactory");

module.exports = async (client, reaction, user) => {
  if (user.bot) return;
  if (reaction.message.partial) {
    await reaction.message.fetch();
  }

  if (reaction.partial) {
    await reaction.fetch();
  }

  let roleSystemData = await serverQueryFactory
    .checkRoleSystemQuery(client)
    .get(reaction.message.id, reaction.message.guild.id);

  if (roleSystemData.message_id === reaction.message.id) {
    if (reaction.emoji.name === "✅") {
      let role = reaction.message.guild.roles.cache.find(
        (r) => r.id === roleSystemData.role_id
      );

      if (role) {
        const member = reaction.message.guild.members.resolve(user.id);
        if (!member) return;
        member.roles.remove(role);
      } else {
        reaction.message.channel
          .reply(
            `Un problème est survenu lors de l'obtention du rôle, merci de reéessayer plus tard`
          )
          .then((message) => message.delete({ timeout: 4000 }))
          .catch((error) => console.log(error));
      }
    }
  }
};
