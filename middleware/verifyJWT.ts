require("dotenv").config()
import { Request, Response,NextFunction } from "express";


const jwt=require("jsonwebtoken")


const verifyJWT=(req:any,res:Response,next:NextFunction)=>{
    const authHeader=req.headers.authorization || req.headers.Authorization;

    if(!authHeader?.toString()?.startsWith('Bearer')){
        return res.status(401).json({message:"Unauthorized"})
    }

    const token=authHeader.toString().split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err:any,decoded:any)=>{
            if(err) return res.status(403).json({message:"Forbidden"})
            req.user=decoded.userInfo.username;
            req.roles=decoded.userInfo.roles;
            console.log("username",req.user)
            next()

        }

    )
}


module.exports=verifyJWT