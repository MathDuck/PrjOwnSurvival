const { Client, Collection } = require("discord.js");
require("dotenv").config();
const commandhandler = require("./handlers/commandHandler");
const eventhandler = require("./handlers/EventHandler");
const SQLite = require("better-sqlite3");
const db = new SQLite("./data/db.sqlite", { verbose: console.log });
const createDefaultTables = require("./factories/createDefaultTablesFactory");

const client = new Client({
  disableEveryone: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  presence: {
    activity: { name: "les logs", type: "WATCHING" },
    status: "online",
  },
});

client.commands = new Collection();
client.aliases = new Collection();
client.limits = new Map();

const load = async () => {
  client.db = db;
  console.log(`Chargement des commandes...`);
  await commandhandler.run(client);
  console.log(`Chargement des évents...`);
  await eventhandler.run(client);
  console.log(`Création des tables dans la BDD (si non existantes)...`);
  await createDefaultTables.createDefaultTables(client);
};

load();

client.login(process.env.BOT_TOKEN);
