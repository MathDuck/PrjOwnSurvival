const serverQueryFactory = require("../factories/serverQueryFactory");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const dateFormat = require("../functions/dateFormat");
const Canvas = require("canvas");
Canvas.registerFont("./Ubuntu-Bold.ttf", { family: "Ubuntu" });

module.exports = async (client, member) => {
  if (!member) return;
  if (member.user.bot) return;

  const checkServerData = await serverQueryFactory
    .checkDataQuery(client)
    .get(member.guild.id);

  const logChannelId = checkServerData.log_channel_id;
  if (logChannelId === "0") return;

  client.channels
    .fetch(logChannelId)
    .then((channel) => {
      const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.avatarURL())
        .setDescription(
          `**<@${member.id}> a rejoint le serveur discord! Yipi!**`
        )
        .addField(
          "**Date d'arrivée**",
          `${dateFormat.getFullDate(Date.now())}`
        )
        .setFooter(`Member ID: ${member.id}`)
        .setTimestamp()
        .setColor("GREEN");

      return channel.send(embed);
    })
    .catch((error) => {
      console.log(`Impossible de trouver le channel de logs. / ${error}`);
    });

  const generalChannelId = checkServerData.general_channel_id;

  client.channels
    .fetch(generalChannelId)
    .then(async (channel) => {
      // Set a new canvas to the dimensions of 700x250 pixels
      const canvas = Canvas.createCanvas(700, 250);
      // ctx (context) will be used to modify a lot of the canvas

      const ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage("./welcome.jpg");
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#808080";
      ctx.lineWidth = 7;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Slightly smaller text placed above the member's display name
      ctx.font = "28px Ubuntu";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        "Installe toi sur ton siège,",
        canvas.width / 2.5,
        canvas.height / 2.5
      );

      // Add an exclamation point here and below
      ctx.font = applyText(canvas, `${member.user.displayName}!`);
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        `${member.user.tag}!`,
        canvas.width / 2.5,
        canvas.height / 1.5
      );

      ctx.beginPath();
      ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.closePath();
      ctx.clip();

      // Wait for Canvas to load the image
      const avatar = await Canvas.loadImage(
        member.user.displayAvatarURL({ format: "png" })
      );
      // Draw a shape onto the main canvas
      ctx.drawImage(avatar, 25, 25, 200, 200);

      const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "welcome-image.png"
      );

      channel.send(
        `**Bienvenue sur ${member.guild}, ${member.user}!**`,
        attachment
      );
    })
    .catch((error) => {
      console.log(`Impossible de générer l'image de bienvenue. / ${error}`);
    });

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 70;

    do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${(fontSize -= 10)}px Ubuntu`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
  };
};
