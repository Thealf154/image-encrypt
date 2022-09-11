/* Importar librerías de JS */
// Librerías para montar el servidor
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const CryptoJS = require("crypto-js");
const corsOptions = { origin: "*" };
const httpServer = require("http").createServer();
const socket_server = require("socket.io")(httpServer, {
  cors: {origin: "*"},
});
httpServer.listen(3001);

// Esto es para enviar un html de la app al cliente
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

socket_server.on("connection", (socket) => {
  console.log("Usuario Conectado");
  socket.on("send_image", (msg) => {
    console.log(msg);
    const imageStringDecrypted = CryptoJS.AES.decrypt(msg, "password").toString(
      CryptoJS.enc.Utf8
    );
    socket.emit("decryption", imageStringDecrypted);
  });
});

// Esto no es el web socket, es el puerto del servidor.
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
