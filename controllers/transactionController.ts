import { Request, Response } from "express";
import { AppDataSource } from "../config/dbConfig";
import { Transaction } from "../entities/Transaction";

let date = new Date();
let currentdate =
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

const createTransaction = async (req: Request, res: Response) => {
  const transactionData = req.body;
  console.log("data send in body", transactionData);
  const repo = AppDataSource.getRepository(Transaction);
  const transaction = repo.create(transactionData);
  await repo.save(transaction);
  return res.json(transaction);
};

const getTransactions = async (req: Request, res: Response) => {
  const repo = AppDataSource.getRepository(Transaction);
  const tr = await repo.find();
  return res.json(tr);
};

/* transaction in  duration of time*/

const getTransactionsToday = async (req: Request, res: Response) => {
  const repo = await AppDataSource.getRepository(Transaction)
    .createQueryBuilder("transaction")
    .select("transaction")
    .where("transaction.transaction_date = :today  ", { today: currentdate })
    .getMany();

  return res.json(repo);
};

const getTransactionsWeek = async (req: Request, res: Response) => {
  const repo = await AppDataSource.getRepository(Transaction)
    .createQueryBuilder("transaction")
    .select("transaction")
    .where("(:today-transaction.transaction_date)<=7  ", { today: currentdate })
    .getMany();

  return res.json(repo);
};

const getTransactionsMonth = async (req: Request, res: Response) => {
  const repo = await AppDataSource.getRepository(Transaction)
    .createQueryBuilder("transaction")
    .select("transaction")
    .where("(:today-transaction.transaction_date)<=30  ", {
      today: currentdate,
    })
    .getMany();

  return res.json(repo);
};
/*sum in*/

const getAmountInTransactionsTotal = async (req: Request, res: Response) => {
  
  const { sum } = await AppDataSource.getRepository(Transaction)
    .createQueryBuilder("transaction")
    .select("coalesce(SUM(transaction.amount),0)", "sum")
    .where("transaction.type = :type", { type: "deposit" })
    
    .getRawOne();

  return res.json({ sum });
};

const getAmountInTransactionsToday = async (req: Request, res: Response) => {

 
  const { sum } = await AppDataSource.getRepository(Transaction)
    .createQueryBuilder("transaction")
    .select("coalesce(SUM(transaction.amount),0)", "sum")
    .where("transaction.type = :type", { type: "deposit" }) 
    .andWhere("transaction.transaction_date= :today", {
      today: currentdate,
    })
    .getRawOne();

  return res.json({ sum });
};

const getAmountInTransactionsWeek = async (req: Request, res: Response) => {
  const { sum } = await AppDataSource.getRepository(Transaction)
    .createQueryBuilder("transaction")
    .select("coalesce(SUM(transaction.amount),0)", "sum")
    .where("transaction.type = :type", { type: "deposit" })
    .andWhere("( :today - transaction.transaction_date  ) <= 7  ", {
      today: currentdate,
    })

    .getRawOne();

  return res.json({ sum });
};

const getAmountInTransactionsMonth = async (req: Request, res: Response) => {
  const { sum } = await AppDataSource.getRepository(Transaction)
    .createQueryBuilder("transaction")
    .select("coalesce(SUM(transaction.amount),0)", "sum")
    .where("transaction.type = :type", { type: "deposit" })
    .andWhere("(:today-transaction.transaction_date)<=30  ", {
      today: currentdate,
    })

    .getRawOne();

  return res.json({ sum });
};

/*sum Out*/

const getAmountOutTransactionsTotal= async (req: Request, res: Response) => {
  const { sum } = await AppDataSource.getRepository(Transaction)
    .createQueryBuilder("transaction")
    .select("coalesce(SUM(transaction.amount),0)", "sum")
    .where("transaction.type = :type", { type: "withraw" })

    .getRawOne();

  return res.json({ sum });
};

const getAmountOutTransactionsToday = async (req: Request, res: Response) => {
  const { sum } = await AppDataSource.getRepository(Transaction)
    .createQueryBuilder("transaction")
    .select("coalesce(SUM(transaction.amount),0)", "sum")
    .where("transaction.type = :type", { type: "withraw" })
     .andWhere("transaction.transaction_date = :today ", {
      today: currentdate,
    })

    .getRawOne();

  return res.json({ sum });
};

const getAmountOutTransactionsWeek = async (req: Request, res: Response) => {
  const { sum } = await AppDataSource.getRepository(Transaction)
    .createQueryBuilder("transaction")
    .select("coalesce(SUM(transaction.amount),0)", "sum")
    .where("transaction.type = :type", { type: "withraw" })
    .andWhere("(:today-transaction.transaction_date)<=7  ", {
      today: currentdate,
    })

    .getRawOne();

  return res.json({ sum });
};

const getAmountOutTransactionsMonth = async (req: Request, res: Response) => {
  const { sum } = await AppDataSource.getRepository(Transaction)
    .createQueryBuilder("transaction")
    .select("coalesce(SUM(transaction.amount),0)", "sum")
    .where("transaction.type = :type", { type: "withraw" })
    .andWhere("(:today-transaction.transaction_date)<=30  ", {
      today: currentdate,
    })

    .getRawOne();

  return res.json({ sum });
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionsToday,
  getAmountInTransactionsToday,
  getTransactionsWeek,
  getTransactionsMonth,
  getAmountInTransactionsWeek,
  getAmountOutTransactionsWeek,
  getAmountOutTransactionsMonth,
  getAmountOutTransactionsToday,
  getAmountInTransactionsMonth,
  getAmountOutTransactionsTotal,
  getAmountInTransactionsTotal
};
