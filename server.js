const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

// IMPORTANT middleware
app.use(express.json());

const functionRoutes = require("./routes/functionRoutes");

app.use("/api", functionRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Server running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});