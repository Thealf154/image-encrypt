/* Importar librerías de JS */
// Librerías para montar el servidor
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const CryptoJS = require("crypto-js");
const corsOptions = { origin: "*" };
const httpServer = require("http").createServer();
const multer = require("multer");
const socket_server = require("socket.io")(httpServer, {
  cors: { origin: "*" },
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
    console.log("Imagen encriptada recibida");
    const imageStringDecrypted = CryptoJS.AES.decrypt(msg, "password").toString(
      CryptoJS.enc.Utf8
    );
    console.log("Imamen desincriptada exitosamente");

    let imageData = imageStringDecrypted.replace(
      /^data:image\/(jpeg|png|jpg);base64,/,
      ""
    );

    const filetype = imageData.split(".").pop();

    console.log("Guardando imagen...");

    require("fs").writeFile(
      "./img/" +
        Date.now() +
        "_" +
        Math.floor(Math.random() * 1000) +
        "." +
        filetype,
      imageData,
      "base64",
      function (err) {
        if (err != null) console.log(err);
      }
    );

    socket.emit("decryption", imageStringDecrypted);
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./img/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + Math.floor(Math.random() * 1000));
  },
});

// Esto no es el web socket, es el puerto del servidor.
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
