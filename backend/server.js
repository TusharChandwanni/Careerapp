const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectdatabase = require("./config/database");

//config
dotenv.config({ path: "config/config.env" });

//connecting database
connectdatabase();

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/************** Socket IO Code starts ****************/
//connection with socket io
const server = app.listen(process.env.port, () => {
  console.log(`Listening on port ${process.env.port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:4000", // URL of client
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  // Establish connection
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  // Join chat room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`User Joined Room: ${room}`);
  });

  // Typing
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // New message
  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  // Disconnect
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
/************** Socket IO Code ends *****************/

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to unhandled error`);
  server.close(() => {
    process.exit(1);
  });
});
