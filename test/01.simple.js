var lib = require('../lib');
var path = require('path');
var should = require('should');
var mkdirp = require('mkdirp');
var fs = require('fs');
var rmrf = require('rmrf');


describe('Simple test', function() {
  var dest = path.join(__dirname, './output');
  var templates = path.join(__dirname, './service_templates');

  before(function() {
    mkdirp.sync(dest);
  });

  after(function() {
    rmrf(dest);
  });

  it('should render file', function() {
    var file = path.join(templates, 'test1.service');
    var result = lib.render(file, dest);
    result.should.eql('test1.service');
    var stat = fs.statSync(path.join(dest, result));
    should.exist(stat);
    stat.isFile().should.be.true;
  });

  it('should render filename with env', function() {
    var file = path.join(templates, 'test2-{{env}}.service');
    var result = lib.render(file, dest, {env: 'production'});
    result.should.eql('test2-production.service');

    var output = path.join(dest, result);
    var stat = fs.statSync(output);
    should.exist(stat);
    stat.isFile().should.be.true;

    var contents = fs.readFileSync(output, 'utf8');
    contents.should.containEql('myservice:production');
  });
})
