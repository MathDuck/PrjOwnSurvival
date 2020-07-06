const { Client, Collection } = require("discord.js");
require("dotenv").config();

const client = new Client({
  disableEveryone: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  presence: {
    activity: { name: "botActivityStatus", type: "WATCHING" },
    status: "online",
  },
});

client.commands = new Collection();
client.aliases = new Collection();
client.limits = new Map();

const load = async () => {
  console.log(`Chargement des commandes...`);
  await commandhandler.run(client);
  console.log(`Chargement des évents...`);
  await eventhandler.run(client);
};

load();

client.login(process.env.TOKEN);
