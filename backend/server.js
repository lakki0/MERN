const app = require("./app");
const dotenv = require("dotenv");
const connectionStr = require("./config/database");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled rejection");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });
// db connection
connectionStr();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled rejection");

  server.close(() => {
    process.exit(1);
  });
});
