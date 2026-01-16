import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./config/connectToDB.js";
import userRoutes from "./routes/userRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());
app.use("/api/auth", userRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("The server is working");
});

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server running at ${PORT}`);
});
