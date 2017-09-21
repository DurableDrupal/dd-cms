fs = require('fs');

file = '../content/textos/adipiscing-gansta.md'

fs.readFile(file, 'utf8', function (err,data) {
  if (err) {
    return console.log(err)
  }
  console.log(data);
})