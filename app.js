var Hapi = require('hapi');
var Path = require('path');
var Good = require('good');


/*
 * Hapi Server setup
 */
var server = new Hapi.Server();

server.connection({port: 3000});


/*
 * Socket.io
 */
var io = require('socket.io')(server.listener);

io.on('connection', function (socket) {

    /*
     * listen for new messages and send them back to the clients
     */
    socket.on('new:chat:message', function (message) {

        socket.broadcast.emit('add:chat:message', {
            message: message
        });
    });

});


/*
 * Hapi View
 */
server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views'
});


/*
 * Server Routes
 */
server.route({
    path: "/views/{path*}",
    method: "GET",
    handler: {
        directory: {
            path: Path.join(__dirname, 'views'),
            listing: false,
            index: false
        }
    }
});

server.route({
    path: "/dist/{path*}",
    method: "GET",
    handler: {
        directory: {
            path: Path.join(__dirname, 'dist'),
            listing: false,
            index: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index', {title: 'ChatApp'});
    }
});


/*
 * Use Hapi Plug-in
 */
server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
