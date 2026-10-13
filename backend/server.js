require("dotenv").config();


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://task-management-system-eight-ruby.vercel.app/",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.originalUrl} - Request received`);

  res.on("finish", () => {
    console.log(
      `📤 ${req.method} ${req.originalUrl} - Response sent: ${res.statusCode}`,
    );
  });

  next();
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend server is running!",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
