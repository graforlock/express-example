const io = require('socket.io');

module.exports = server => {
    io(server).on('connection', socket => {
    });
};
