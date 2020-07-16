const serverQueryFactory = require("../factories/serverQueryFactory");
const { MessageEmbed } = require("discord.js");

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

  if (!roleSystemData) return;

  if (roleSystemData.message_id === reaction.message.id) {
    if (reaction.emoji.name === "✅") {
      let role = reaction.message.guild.roles.cache.find(
        (r) => r.id === roleSystemData.role_id
      );

      if (role) {
        const checkServerData = await serverQueryFactory
          .checkDataQuery(client)
          .get(reaction.message.guild.id);
        const member = reaction.message.guild.members.resolve(user.id);
        if (!member) return;
        member.roles
          .add(role)
          .then((member) => {
            member.send(
              `**✅  Félicitations ${member}, tu as obtenu le rôle ${role.name} sur le serveur ${reaction.message.guild.name} !**`
            );

            const logChannelId = checkServerData.log_channel_id;
            if (logChannelId === "0") return;

            client.channels
              .fetch(logChannelId)
              .then((channel) => {
                const embed = new MessageEmbed()
                  .setAuthor(member.user.tag, member.user.avatarURL())
                  .setDescription(`**${member}** a obtenu le rôle ${role}.`)
                  .setTimestamp()
                  .setColor("GREEN");

                return channel.send(embed);
              })
              .catch((error) => {
                console.log(`Erreur: ${error}`);
              });
          })
          .catch((error) => console.log(error));
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
