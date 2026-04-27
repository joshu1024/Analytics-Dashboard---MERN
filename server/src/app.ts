import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet"

import authRoutes from "./routes/authRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import companyRoutes from "./routes/companyRoutes";
import billingRoutes from "./routes/billingRoutes";
import userRoutes from "./routes/userRoutes";
import settingsRoutes from "./routes/settingsRoutes";

const app = express();


const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") ?? [
     "http://localhost:5173"
   ];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(helmet())

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
