'use strict';

var fs = require('fs');
var https = require('https');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var options = {
  key: fs.readFileSync('./config/server.key'),
  cert: fs.readFileSync('./config/server.crt'),
  ca: fs.readFileSync('./config/ca.crt')
};

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  https.createServer(options, app).listen(port, function () {
    console.log('Server started @ %s', port);
  });

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
