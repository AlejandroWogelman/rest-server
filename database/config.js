const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://user_node_cafe:U4lqyjLqMXgA7Lg2@miclustercafe.td5nttp.mongodb.net/cafeDB" /* ,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      } */
    );
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConection,
};
