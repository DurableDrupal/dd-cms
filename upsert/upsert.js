var fs = require('fs')
var matter = require('gray-matter')
var config = require('../config')
var request = require('request')

var host = config.server.host;
var port = config.server.port;

// file = '../content/textos/adipiscing-gansta.md'
file = '../content/textos/black-pellentesque.md'

fs.readFile(file, 'utf8', function (err,data) {
  if (err) {
    return console.log(err)
  }
  console.log(data);
  // parse front matter
  text = matter(data)
  console.log(text);
  // upsert (based on unique slug) all slugs could have timestamp, etc.
  request(
    {
      method: 'PUT',
      json: text,
      headers: {'Content-Type': 'application/json'},
      url: 'http://' + host + ':' + port + '/api/texts' 
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
