class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    //on connection
    this.io.on("connection", (socket) => {
      console.log("client connected, socket ID : ", socket.id);
    });
  }
}

module.exports = Sockets;
