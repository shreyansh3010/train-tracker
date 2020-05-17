const trainController = require('../controllers/trainController')

socketBootstrap = (server) => {
    const io = require('socket.io')(server);
    var allClients = [];
    var allSetInterVal = [];
    io.on('connection', (socket) => {
        allClients.push(socket);
        console.log('a user connected');

        socket.on('get_train_status', (data) => {
            data = JSON.parse(data)
            trainController.getTrainStatus(data.train_no, data.start_date)
                .then((trainDetails) => {
                    socket.emit(`${data.train_no}`, trainDetails[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
            allSetInterVal.push(setInterval(() => {
                trainController.getTrainStatus(data.train_no, data.start_date)
                    .then((trainDetails) => {
                        console.log(data.train_no);

                        socket.emit(`${data.train_no}`, trainDetails[0]);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }, 10000))
        })
        socket.on('disconnect', function () {
            console.log('Got disconnect!');

            var i = allClients.indexOf(socket);
            clearInterval(allSetInterVal[i])
            allClients.splice(i, 1);
            allSetInterVal.splice(i, 1);
        });
    });
}

module.exports = {
    socketBootstrap: socketBootstrap
}