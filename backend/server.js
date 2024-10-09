const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const groupRoutes = require("./routes/group");
const sequelize = require("./config/db");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(helmet());

// app.use(cors({
//   origin: 'http://localhost:4200', //url du front
//   credentials: true
// }));

app.use(cookieParser());

sequelize
  .authenticate()
  .then(() => console.log("MySQL connected"))
  .catch((err) => console.log("MySQL connection error:", err));

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Sync error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;
