const express = require("express");
const connectDB = require("./config/database");

const app = express();
const PORT = 7777;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const errHandler = require("./middleware/errorHandler");


app.use(
  cors({
    origin: "http://localhost:7777",
    credentials: true,
  })
);

app.use(express.json());
app.use(errHandler); 
app.use(cookieParser());

app.use("/api/auth", authRoutes);

async function startServer() {
  try {
    await connectDB();
    console.log("Database connection established...");

    app.listen(PORT, () => {
      console.log(`App successfully running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error.message);
    process.exit(1);
  }
}

startServer();
