require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const statusRoutes = require("./routes/status.routes");
const profileRoutes = require("./routes/profile.routes");
const chatRoutes = require("./routes/chat.routes");
const paymentRoutes = require("./routes/payment.routes");
const bodyParser = require("body-parser");
const rfmRoutes = require("./routes/rfm.routes");
const jwt = require("jsonwebtoken");
const Message = require("./models/message.model");
const User = require("./models/user.model").User;
const Task = require("./models/task.model");
const PORT = process.env.PORT || 5000;
const http = require("http");
const socketIo = require("socket.io");
const { ExpressPeerServer } = require("peer");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    // origin: "https://polite-field-09918cc00.4.azurestaticapps.net",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
global.io = io;
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
app.use("/peerjs", peerServer);
connection();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.get("/", (req, res) => {
  res.send(
    "Welcome to the API! Use the /api/cruds endpoint to interact with CRUD operations."
  );
});
app.use(bodyParser.json());
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/rfm", rfmRoutes);
app.use("/test/admin/", (req, res) => {
  res.status(200).json({
    crmData: [
      {
        id: 1,
        name: "Acme Corp",
        contact: "john.doe@acme.com",
        phone: "+1-555-1234",
        status: "Active",
        lastContact: "2024-06-01",
        notes: "Interested in premium plan.",
        revenue: 12000,
        assignedTo: "Alice Smith"
      },
      {
        id: 2,
        name: "Beta Industries",
        contact: "jane.smith@beta.com",
        phone: "+1-555-5678",
        status: "Lead",
        lastContact: "2024-05-28",
        notes: "Requested demo.",
        revenue: 0,
        assignedTo: "Bob Johnson"
      },
      {
        id: 3,
        name: "Gamma LLC",
        contact: "mike.brown@gamma.com",
        phone: "+1-555-8765",
        status: "Prospect",
        lastContact: "2024-05-30",
        notes: "Negotiating contract.",
        revenue: 5000,
        assignedTo: "Carol Lee"
      },
      {
        id: 4,
        name: "Delta Solutions",
        contact: "lisa.white@delta.com",
        phone: "+1-555-4321",
        status: "Inactive",
        lastContact: "2024-04-15",
        notes: "No response to follow-up.",
        revenue: 0,
        assignedTo: "David Kim"
      },
      {
        id: 5,
        name: "Echo Enterprises",
        contact: "tom.green@echo.com",
        phone: "+1-555-2468",
        status: "Active",
        lastContact: "2024-06-03",
        notes: "Renewed contract.",
        revenue: 15000,
        assignedTo: "Emily Clark"
      }
    ]
  });
});
app.use("/test/", (req, res)=>{res.status(500).json(
  { admin_id:"cocply135@gmail.com", admin_password:"admin@123" });
})

const users = {};
io.on("connection", (socket) => {
  // console.log("New client connected");
  socket.on("register-user", (data) => {
    const { userId, peerId } = data;
    users[userId] = { socketId: socket.id, peerId };
    socket.userId = userId;
    // console.log(
    //   `User ${userId} registered with socket ID ${socket.id} and peer ID ${peerId}`
    // );
  });
  socket.on("check-user-registered", (data) => {
    const { to } = data;
    const toUser = users[to];
    if (toUser) {
      socket.emit("user-registered", {
        registered: true,
        peerId: toUser.peerId,
      });
    } else {
      socket.emit("user-registered", { registered: false });
    }
  });
  socket.on("call-user", (data) => {
    const { to, offer } = data;
    const from = socket.userId;
    const toUser = users[to];
    if (toUser) {
      io.to(toUser.socketId).emit("call-request", { from, offer });
    }
  });
  socket.on("call-accepted", (data) => {
    const { to, answer } = data;
    const from = socket.userId;
    const toUser = users[to];
    if (toUser) {
      io.to(toUser.socketId).emit("call-accepted", { from, answer });
    }
  });
  socket.on("call-rejected", (data) => {
    const { to } = data;
    const from = socket.userId;
    const toUser = users[to];
    if (toUser) {
      io.to(toUser.socketId).emit("call-rejected", { from });
    }
  });
  socket.on("disconnect", () => {
    // console.log("Client disconnected");
    delete users[socket.userId];
  });
  socket.on("joinTaskRoom", (taskId, token) => {
    if (!token) return;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return;
    });
    socket.join(taskId);
    // console.log(`User joined task room: ${taskId}`);
  });
  socket.on("leaveTaskRoom", (taskId, token) => {
    if (!token) return;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return;
    });
    socket.leave(taskId);
    // console.log(`User left task room: ${taskId}`);
  });
  socket.on("sendMessage", async ({ taskId, content, senderId }) => {
    try {
      if (!content || !taskId) {
        throw new Error("Message content and task ID are required");
      }

      const sender = await User.findById(senderId);
      const task = await Task.findById(taskId).populate("customer employee");

      if (!task) {
        throw new Error("Task not found");
      }

      if (
        ![task.customer._id.toString(), task.employee._id.toString()].includes(
          senderId.toString()
        )
      ) {
        throw new Error(
          "You are not authorized to send messages for this task"
        );
      }

      const message = await Message.create({
        sender: senderId,
        task: taskId,
        content,
      });

      task.messages.push(message._id);
      await task.save();

      io.to(taskId).emit("receiveMessage", { message, sender });
    } catch (error) {
      // console.error("Error sending message:", error);
    }
  });
  socket.on("end-call", (data) => {
    const { to } = data;
    const toUser = users[to];
    if (toUser) {
      io.to(toUser.socketId).emit("call-ended");
    }
  });
  socket.on("markMessagesAsRead", async ({ taskId, userId }) => {
    try {
      const updatedMessages = await Message.updateMany(
        { task: taskId, isRead: false, sender: { $ne: userId } },
        { $set: { isRead: true } }
      );

      io.to(taskId).emit("messagesRead", { taskId, userId });
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  });
});
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
