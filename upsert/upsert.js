// run with npm from project root: 'npm run upsert -- texts crunk-vizzle'
// else 'cd upsert; node upsert texts crunk-vizzle'

var fs = require('fs')
var matter = require('gray-matter')
var config = require('../config')
var request = require('request')

var host = config.server.host;
var port = config.server.port;

if (process.argv.length > 3) {
  contentType = process.argv[2]
  param = process.argv[3]
} else {
  console.log("\nnode upsert content-type slug")
  console.log("node upsert texts the-book\n")
  process.exit(0)
}

file = '../content/' + contentType + '/' + param + '.md'

fs.readFile(file, 'utf8', function (err,data) {
  if (err) {
    return console.log(err)
  }
  console.log(data);
  // parse front matter
  text = matter(data)
  // console.log(text);
  // upsert (based on unique slug) all slugs could have timestamp, etc.
  request(
    {
      method: 'PUT',
      json: text,
      headers: {'Content-Type': 'application/json'},
      url: 'http://' + host + ':' + port + '/api/' + contentType
    },
    function (error, response) {
      if (error) {
        console.log("error", error)
      } else {
        console.log("response", response.body)
      }
    }
  )
})
