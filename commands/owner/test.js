const Canvas = require("canvas");
Canvas.registerFont("./Ubuntu-Bold.ttf", { family: "Ubuntu" });
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
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
    "Installe toi dans ton siège,",
    canvas.width / 2.5,
    canvas.height / 2.5
  );

  // Add an exclamation point here and below
  ctx.font = applyText(canvas, `${message.author.displayName}!`);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `${message.author.tag}!`,
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
    message.author.displayAvatarURL({ format: "png" })
  );
  // Draw a shape onto the main canvas
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );

  message.channel.send(
    `**Bienvenue sur ${message.guild}, ${message.author}!**`,
    attachment
  );
};

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

module.exports.help = {
  name: "test",
  aliases: [],
  description: "test",
  usage: "<>",
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
