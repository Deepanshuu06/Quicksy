const express = require("express");
const connectDB = require("./config/database");

const app = express();
const PORT = process.env.PORT || 7777;









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
