import express from "express";
import { Client } from "../entities/Client";
import { AppDataSource } from "../config/dbConfig";


const router = express.Router();

router.post("/api/users", async (req, res) => {

  const clientData = req.body;
  const repo = AppDataSource.getRepository(Client);
  const newUser = repo.create(clientData);

  await repo.save(newUser);

  return res.json(newUser);
  
}).get("/api/users",async (req,res)=>{
  const repo=AppDataSource.getRepository(Client);

  const users=await repo.find()
  return res.json(users);
})




;

export { router as routerUsers };
