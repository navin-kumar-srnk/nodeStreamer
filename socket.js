const io = require('socket.io')();


const socket = (io) => {


    io.on('connection', (socket) => {

        console.log('new connection');

        // io.emit("notify","Vikash")

        // socket.on('getAllNotification', (socket) => {
        //     console.log("getAllNotification-------------");
        //     sendApprovalNotification()
        // })

        socket.on('disconnect', () => console.log('disconnected'));

    })
}

function sendNotification(detections) {
    console.log("sendNotification---------------");
    io.emit('detectionAlert', detections)

}



module.exports = { io, socket, sendNotification }