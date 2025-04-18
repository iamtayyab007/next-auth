import mongoose from "mongoose";

const connect = process.env.MONGO_URI!;
console.log("", connect);
export async function connectDB() {
  try {
    mongoose.connect(connect);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongodb connected successfully");
    });
    connection.on("error", (error) => {
      console.log(
        "Mongodb connection error, please make sure db is up and running" +
          error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connecting to DB");
    console.log(error);
  }
}
