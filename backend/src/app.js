const express = require("express");
const connectDB = require("./config/database");

const app = express();
const PORT = 7777;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/user/auth.routes");
const adminRoutes = require("./routes/store/admin.routes");
const superAdminRoutes = require("./routes/superAdmin/superAdmin.routes");
const publicRoutes = require("./routes/PublicRoutes/public.routes");
const userRoutes = require("./routes/user/user.routes");
const cartRoutes = require("./routes/user/cart.routes");
const orderRoutes = require("./routes/user/order.routes");

const errHandler = require("./middleware/errorHandler");




app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use('/api/v1/public', publicRoutes); 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user" , userRoutes)
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/super-admin", superAdminRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use(errHandler); 

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
