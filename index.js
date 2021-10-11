import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bodyParser from 'body-parser'
import userRoutes from "./routes/userRoutes.js";
import featureRoutes from "./routes/featureRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.json({extended : false}));

app.use("/api/users", userRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
