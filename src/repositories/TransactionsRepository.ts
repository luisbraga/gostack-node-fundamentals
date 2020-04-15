// import { uuid } from 'uuidv4'
import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionsWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionsWithBalance {
    return {
      transactions: [...this.transactions],
      balance: this.getBalance(),
    };
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, { type, value }) => {
        const income = type === 'income' ? value : 0;
        const outcome = type === 'outcome' ? value : 0;
        return {
          income: acc.income + income,
          outcome: acc.outcome + outcome,
          total: acc.income + income - (acc.outcome + outcome),
        };
      },
      { income: 0, outcome: 0, total: 0 },
    );
    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
