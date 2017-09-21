var fs = require('fs')
var matter = require('gray-matter')
var config = require('../config')

var host = config.server.host;
var port = config.server.port;

console.log(host, port)

file = '../content/textos/adipiscing-gansta.md'

fs.readFile(file, 'utf8', function (err,data) {
  if (err) {
    return console.log(err)
  }
  console.log(data);
  // parse front matter
  text = matter(data)
  console.log(text);

  // upsert (based on unique slug) all slugs could have timestamp, etc.

})
