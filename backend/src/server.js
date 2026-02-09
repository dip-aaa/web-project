require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());

// Quick test routes
app.get("/backend", (req, res) => res.send("Backend is running"));
app.get("/api/hi", (req, res) => res.send("Hi"));

// API routes
app.use("/api",routes)

// 404 + error handlers
app.use((req, res) => res.status(404).json({ message: "Not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});