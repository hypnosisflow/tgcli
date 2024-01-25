var pg = require("pg");

var conString = process.env.CON_STRING;
var client = new pg.Client(conString);

console.log("db connnection");

client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    // console.log("dbfile", result.rows[0].theTime);
  });
});

module.exports = client;
