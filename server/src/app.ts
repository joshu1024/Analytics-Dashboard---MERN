import express = require("express");
import cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const companyRoutes = require("./routes/companyRoutes");
const billingRoutes = require("./routes/billingRoutes");
const userRoutes = require("./routes/userRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

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

export = app;
