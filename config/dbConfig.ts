require("dotenv").config();

import { DataSource } from "typeorm";
import { Client } from "../entities/Client";
import { Transaction } from "../entities/Transaction";
import { Banker } from "../entities/Banker";

/*{
  type:  "postgres",
  host: process.env.HOST "ldpg-ci5lcn5ph6eh6momsd70-a.oregon-postgres.render.com",
  port: process.env.PORT 5432,
  username: process.env.USERNAME "pdbowallet_user",
  password: process.env.PASSWORD "it942Eq69Gz4Lwu7M2DTlzBgPgYtKNxr",
  database: process.env.DB  "dbowallet",
  
}*/

console.log("env",process.env.PASSWORD ,process.env.USER)

export const AppDataSource = new DataSource({
  type: "postgres",
  host:process.env.URL,
  port: 5432,
  username:process.env.USER ,
  password:process.env.PASS ,
  database: process.env.DB,
  synchronize: true,
  entities: [Client,Banker ,Transaction],
});



