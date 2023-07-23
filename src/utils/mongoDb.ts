import { connect, connection } from "mongoose";
const { MONGO_URI = "" } = process.env;

console.log(MONGO_URI);

const options: any = {
  useUnifiedTopology: true,

  useNewUrlParser: true,
};

export const connectToDatabase = async () => {
  if (!connection.readyState) {
    console.log("Connecting to ", MONGO_URI);
    connect(MONGO_URI, options);
  }
};
