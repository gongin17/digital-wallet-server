require("dotenv").config();

import { DataSource } from "typeorm";
import { Client } from "../entities/Client";
import { Transaction } from "../entities/Transaction";
import { Banker } from "../entities/Banker";

/*{
  type: "postgres",
  host: "ldpg-ci5lcn5ph6eh6momsd70-a.oregon-postgres.render.com",
  port: 5432,
  username: "pdbowallet_user",
  password: "it942Eq69Gz4Lwu7M2DTlzBgPgYtKNxr",
  database: "dbowallet",
  
}*/

/* type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "toor",
  database: "postgres", 
  synchronize:true,
  entities: [User], */

export const AppDataSource = new DataSource({
  type: "postgres",
  host:process.env.URL,
  port: 5432,
  username: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  synchronize: true,
  entities: [Client,Banker ,Transaction],
});



