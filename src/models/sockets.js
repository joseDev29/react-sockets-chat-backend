const {
  userConnected,
  userDisconnected,
  getUsers,
  saveMessage,
} = require("../controllers/sockets");
const { validateJWTSocket } = require("../middlewares/validate-token");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    //on connection
    this.io.on("connection", async (socket) => {
      const [valid, uid] = validateJWTSocket(socket.handshake.query["x-token"]);

      if (!valid) {
        console.log("client not auth disconnected : ", socket.id);
        return socket.disconnect();
      }

      await userConnected(uid);

      //unir el user a una sala de socket.io
      socket.join(uid);

      console.log("client connected, socket ID : ", socket.id, ", uid: ", uid);

      this.io.emit("list-users", await getUsers());

      socket.on("personal-message", async (payload) => {
        const message = await saveMessage(payload);
        if (message) {
          this.io.to(payload.to).emit("personal-message", message);
          this.io.to(payload.from).emit("personal-message", message);
        }
      });

      socket.on("disconnect", async () => {
        await userDisconnected(uid);
        this.io.emit("list-users", await getUsers());
        console.log(
          "client disconnected, socket ID : ",
          socket.id,
          ", uid: ",
          uid
        );
      });
    });
  }
}

module.exports = Sockets;
