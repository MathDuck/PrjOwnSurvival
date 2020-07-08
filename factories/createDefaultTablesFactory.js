module.exports = {
  createDefaultTables: function (client) {
    client.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS servers (guild_id TEXT PRIMARY KEY, prefix TEXT DEFAULT '!', log_channel_id TEXT DEFAULT 0, general_channel_id TEXT DEFAULT 0, commands_launched INTEGER DEFAULT 0)`
      )
      .run();

    client.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS roles_system (guild_id TEXT DEFAULT NULL, message_id TEXT DEFAULT NULL, role_id TEXT DEFAULT NULL)`
      )
      .run();

    console.log(`Tables créées (si non existantes)...`);
  },
};
