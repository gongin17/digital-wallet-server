require("dotenv").config();

import { DataSource } from "typeorm";
import { Client } from "../entities/Client";
import { Transaction } from "../entities/Transaction";
import { Banker } from "../entities/Banker";





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



