import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import companyRoutes from "./routes/companyRoutes";
import billingRoutes from "./routes/billingRoutes";
import userRoutes from "./routes/userRoutes";
import settingsRoutes from "./routes/settingsRoutes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://dashboard-mern-tau.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (_req, res) => {
  res.send("The server is working");
});

export default app;
