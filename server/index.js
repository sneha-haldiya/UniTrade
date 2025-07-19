const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")
const connectDB = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  })
);

// Routes
app.use("/api/users", userRoutes);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});