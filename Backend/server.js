import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend URL during dev
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "x-admin-password"]
}));
app.use(express.json());

// ✅ Routes
import urlRoutes from "./routes/urlRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; // <-- add this

app.use("/api", urlRoutes);
app.use("/api/admin", adminRoutes); // <-- mount admin route

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
