const express = require("express");
require("dotenv").config();
import bodyParser from "body-parser";
import { routerTransactions } from "./routes/create_transaction";

import { routerUsers } from "./routes/createClient";
import  {AppDataSource} from "./config/dbConfig";

const PORT = process.env.APP_PORT || 3001;

const allowedOrigins=[process.env.ORIGIN]



const corsOptions = {
  origin: (origin:any,callback:any)=>{
   if(allowedOrigins.indexOf(origin) !== -1 || !origin ) {
    callback(null,true)
   }else{
    callback( new Error("not allowed by CORS"))
   }
  },
  credentials:true,
 
  optionsSuccessStatus:200

}

const cookieParser=require("cookie-parser")

const cors=require("cors")


const app=express()
app.use(cors(corsOptions))

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connection success");
  })
  .catch((err) => console.log(err));

  
  app.use(express.json())
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use("/auth",require("./routes/authRoutes"))
   app.use(routerUsers)
  app.use(routerTransactions)
///connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
