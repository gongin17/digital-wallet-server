require("dotenv").config();

const express = require("express");

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { Request, Response } from "express";
import { Client } from "../entities/Client";
import { AppDataSource } from "../config/dbConfig";

const signup = async (req: Request, res: Response) => {
  // const {username ,password, firstName ,lastName,email,balance }=req.body;

  const clientData = req.body;
  console.log("client data :::", clientData);

  try {
    console.log("before hash", clientData.password);
    const hashedPassword = await bcrypt.hash(clientData.password, 10)
    //.lean().exec();
     console.log("client data :::", { ...clientData,password: hashedPassword});
     const repo= AppDataSource.getRepository(Client)
     const newClient=repo.create({ ...clientData,password: hashedPassword})
     await repo.save(newClient)
   

     res.status(201).json({"success" :"user created"})

  } catch (err:any) {
    res.status(500).json({"message": err.message})
  }

  //test111100000
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const repo = AppDataSource.getRepository(Client);

  if (!username || !password) {
  }

  const foundUser = await repo.findOne({
    where: {
      username: username,
    },
  });

  if (!foundUser) {
  }

  const match = await bcrypt.compare(password, foundUser?.password);
  if (!match) {
  }

  const accessToken = jwt.sign(
    {
      userInfo: {
        username: foundUser?.username,
        roles: "",
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser?.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};

const refresh = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    console.log("no cookies or jwt on cookies");
  }
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err: any, decoded: any) => {
      if (err) {
        console.log("error", err);
      }
      const repo = AppDataSource.getRepository(Client);
      const foundUser = await repo.findOne({
        where: {
          username: decoded.username,
        },
      });

      if (!foundUser) {
        console.log("user not found in db ");
      }

      const accessToken = jwt.sign(
        {
          userInfo: {
            username: foundUser?.username,
            roles: "",
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1m",
        }
      );

      res.json({ accessToken });
    }
  );
};
const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, secure: false });
  res.json({ message: "cookie cleared " });
};

module.exports = { login, signup, refresh, logout };
