// run with npm from project root: 'npm run upsert -- texts crunk-vizzle'
// else 'cd upsert; node upsert texts crunk-vizzle'

var fs = require('fs')
var matter = require('gray-matter')
var config = require('../config')
var rp = require('request-promise');

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

const file = '../content/' + contentType + '/' + param + '.md'

var optionsput = 

fs.readFile(file, 'utf8', function (err,data) {
  if (err) {
    return console.log(err)
  }
  text = matter(data)
  rp({
      method: 'PUT',
      uri: 'http://' + host + ':' + port + '/api/' + contentType,
      body: text,
      json: true
    })
    .then(function (body) {
      console.log('body ', body)
    })
    .catch(function (err) {
      console.log('error', err)
    })
})