import express from "express";
const transactionController =require("../controllers/transactionController")

const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();

//router.use(verifyJWT)

router.post("/api/transaction",transactionController.createTransaction)
.get("/api/transaction",transactionController.getTransactions)

.get("/api/transaction/todat",transactionController.getTransactionsToday)
.get("/api/transaction/week",transactionController.getTransactionsWeek)
.get("/api/transaction/month",transactionController.getTransactionsMonth)
.get("/api/transaction/week/amount",transactionController.getAmountInTransactionsWeek )
;

export { router as routerTransactions };
