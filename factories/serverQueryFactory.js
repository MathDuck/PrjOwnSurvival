module.exports = {
  checkDataQuery: function (client) {
    return client.db.prepare(
      "SELECT * FROM servers WHERE guild_id = ? LIMIT 1"
    );
  },

  buildDataQuery: function (client) {
    return client.db.prepare("INSERT INTO servers (guild_id) VALUES (?)");
  },

  updatePrefixQuery: function (client) {
    return client.db.prepare(
      "UPDATE servers SET prefix = ? WHERE guild_id = ? LIMIT 1"
    );
  },

  updateLogChannelQuery: function (client) {
    return client.db.prepare(
      "UPDATE servers SET log_channel_id = ? WHERE guild_id = ? LIMIT 1"
    );
  },

  updateGeneralChannelQuery: function (client) {
    return client.db.prepare(
      "UPDATE servers SET general_channel_id = ? WHERE guild_id = ? LIMIT 1"
    );
  },

  checkRoleSystemQuery: function (client) {
    return client.db.prepare(
      "SELECT * FROM roles_system WHERE message_id = ? AND guild_id = ? LIMIT 1"
    );
  },

  buildRoleSystemQuery: function (client) {
    return client.db.prepare(
      "INSERT INTO roles_system (guild_id, message_id, role_id) VALUES (?, ?, ?)"
    );
  },

  increaseCommandLaunchedQuery: function (client) {
    return client.db.prepare(
      "UPDATE servers SET commands_launched = commands_launched + 1 WHERE guild_id = ? LIMIT 1"
    );
  },
};
