const mongoose = require("mongoose");

function ConnectDb() {
  const dbUrl = process.env.DB_URL;
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    mongoose.disconnect();
    process.exit(1);
  });
}

module.exports = ConnectDb;