const nodeENV = process.env.NODE_ENV;

if (nodeENV === "development") {
  const dotenv = require("dotenv");
  dotenv.config();

  const chalk = require("chalk");
  console.log(chalk.blue("-----> development environment <-----"));
}

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    env: nodeENV,
  },
  mongo_db: {
    host: process.env.MONGO_HOST,
    db_name: process.env.MONGO_DB_NAME,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  },
  jwt: {
    key: process.env.JWT_KEY,
  },
};
