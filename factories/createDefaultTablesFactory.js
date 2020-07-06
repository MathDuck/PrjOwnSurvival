module.exports = {
  createDefaultTables: function (client) {
    client.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS servers (guild_id TEXT PRIMARY KEY, prefix TEXT DEFAULT '!!', log_channel_id TEXT, commands_launched INTEGER DEFAULT 0)`
      )
      .run();

    console.log(`Tables créées (si non existantes)...`);
  },
};
