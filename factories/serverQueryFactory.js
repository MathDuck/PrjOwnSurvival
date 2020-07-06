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

  increaseCommandLaunchedQuery: function (client) {
    return client.db.prepare(
      "UPDATE servers SET commands_launched = commands_launched + 1 WHERE guild_id = ? LIMIT 1"
    );
  },
};
