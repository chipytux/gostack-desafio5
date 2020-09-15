import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface TransactionsWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acumulator: Balance, transaction: Transaction) => {
        const { value } = transaction;
        const balanceAcumulator = acumulator;
        switch (transaction.type) {
          case 'income':
            balanceAcumulator.income += value;
            balanceAcumulator.total += value;
            break;
          case 'outcome':
            balanceAcumulator.outcome += value;
            balanceAcumulator.total -= value;
            break;
          default:
            break;
        }

        return balanceAcumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
