const mongoose = require("mongoose");
const {
  mongo_db: { host, db_name, user, password },
} = require("../config");

const mongoDBConnect = async () => {
  try {
    const uri = `mongodb+srv://${user}:${password}@${host}/${db_name}?retryWrites=true&w=majority`;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("<--------- DB Connected --------->");
  } catch (error) {
    console.log(error);
    throw new Error("-------->  DB Error: ");
  }
};

module.exports = { mongoDBConnect };
