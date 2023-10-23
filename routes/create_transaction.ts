import express from "express";
const transactionController =require("../controllers/transactionController")

const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();

router.use(verifyJWT)

router.post("/api/transaction",transactionController.createTransaction)
.get("/api/transaction",transactionController.getTransactions)

.get("/api/transaction/todat",transactionController.getTransactionsToday)
.get("/api/transaction/week",transactionController.getTransactionsWeek)
.get("/api/transaction/month",transactionController.getTransactionsMonth)

.get("/api/transaction/today/in/amount",transactionController.getAmountInTransactionsToday )
.get("/api/transaction/week/in/amount",transactionController.getAmountInTransactionsWeek )
.get("/api/transaction/month/in/amount",transactionController.getAmountInTransactionsMonth )
.get("/api/transaction/total/in/amount",transactionController.getAmountInTransactionsTotal)

.get("/api/transaction/today/out/amount",transactionController.getAmountOutTransactionsToday )
.get("/api/transaction/week/out/amount",transactionController.getAmountOutTransactionsWeek )
.get("/api/transaction/month/out/amount",transactionController.getAmountOutTransactionsMonth )
.get("/api/transaction/total/out/amount",transactionController.getAmountOutTransactionsTotal)
;

export { router as routerTransactions };
