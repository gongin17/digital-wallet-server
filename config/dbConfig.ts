import { DataSource } from "typeorm";
import { Client } from "../entities/Client";
import { Transaction } from "../entities/Transaction";
import { Banker } from "../entities/Banker";





export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "postgres",
  synchronize: true,
  entities: [Client,Banker ,Transaction],
});
/*const connectDB = async () => {
  let con = await AppDataSource.initialize();

  if (con.isInitialized) console.log("connection boolean", con.isInitialized);
};*/


