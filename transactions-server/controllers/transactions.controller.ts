import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import readline from 'readline';
import Transaction from '../models/transaction.model';

const getTransactions = (req: Request, res: Response, next: NextFunction) => {
  Transaction.findAll()
    .then(transactions => {
      return res.status(200).send(transactions);
    })
    .catch(err => {
      res.statusMessage = `Not found.\n${err}`
      return res.status(400).send();
    })
}

const createTransactions = (req: Request, res: Response, next: NextFunction) => {
  const newTransactions: any[] = [];

  if (req.file) {
    const rl = readline.createInterface({
      input: fs.createReadStream(req.file.path,'utf8'),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      newTransactions.push({
        type: Number(line.slice(0, 1)),
        date: new Date(line.slice(1, 26)),
        product: line.slice(26, 56).trim().toLocaleLowerCase(),
        value: Number(parseFloat(line.slice(56, 66)).toFixed(2)),
        vendor: line.slice(66, 86).trim().toLowerCase().replace(/\s/g, '-'),
      })
    });

    rl.on('close', async () => {
      await Transaction.bulkCreate(newTransactions)
        .then(() => {
          return res.status(200).send({
            message: "Transactions were correctly uploaded",
            success: true
          });
        })
        .catch((err) => {
          return res.status(400).send({
            message: "There was an issue with your upload. Please try again later.\n${err}",
            success: false,
          });
        })
    });
  }
}

export const TransactionsController = {
  createTransactions,
  getTransactions
}