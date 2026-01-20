import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./config/connectToDB.js";
import authRoutes from "./routes/authRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("The server is working");
});

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server running at ${PORT}`);
});
