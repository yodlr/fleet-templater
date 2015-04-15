var swig = require('swig');
var fs = require('fs');
var path = require('path');
var util = require('util');

var log = require('debug')('templater');

var api = module.exports = {};

api.render = function render(template, dest, params) {
  params = params || {};

  // Render the service template file
  log('Request to render ' + template + ' to ' + dest);
  log('Templating parameters: ', util.inspect(params));

  var unit = swig.renderFile(template, params);
  // Also process the filename of the templatefile

  // String templating uses slightly different API
  params = {
    locals: params
  };
  var filename = swig.render(path.basename(template), params);
  // Write out the new unit file to dest/filename

  log('Templatized filename is ', filename);
  var location = path.join(dest, filename);

  log('Writing file to ', location);
  fs.writeFileSync(location, unit);

  return filename;
};
