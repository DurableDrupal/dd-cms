var fs = require('fs')
var matter = require('gray-matter')
var config = require('../config')
var request = require('request')

var host = config.server.host;
var port = config.server.port;

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
  request(
    {
      method: 'PUT',
      json: text,
      headers: {'Content-Type': 'application/json'},
      url: 'http://' + host + ':' + port + '/api/texts' 
    },
    function (error, response) {
      /*
      if (response.statusCode== 201) {
        console.log(201)
      } else {
        console.log('error ' + response.statusCode)
      }
      */
      console.log('got it')
    }
  )
})
