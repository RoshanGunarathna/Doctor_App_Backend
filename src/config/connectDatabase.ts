import { AppDataSource } from "../data-source";

const connectDatabase = async () => {
  AppDataSource.initialize()
    .then(async () => {
      console.log("connected to MySql database");
    })
    .catch((error) => {
      console.log("Failed to connect with MySql database!");

      console.log(error);
    });
};

export default connectDatabase;
