var framework = require('../index');
var url = 'http://127.0.0.1:8001/';
var mem = require('memwatch');

framework.onAuthorization = function(req, res, flags, cb) {
    req.user = { alias: 'Peter Širka' };
    req.session = { ready: true };
    cb(req.url === '/a/');
};

mem.on('leak', function(info) {
    console.log('LEAK ->', info);
});

mem.on('stats', function(info) {
    console.log('STATS ->', JSON.stringify(info));
});

framework.http('debug', { port: 8001 });