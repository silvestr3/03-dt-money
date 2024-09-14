import { createContext, ReactNode, useEffect, useState } from "react";
import { Env } from "../env";

interface TransactionType {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: TransactionType[];
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  async function loadTransactionsList() {
    fetch(`${Env.API_URL}/transactions`)
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }

  useEffect(() => {
    loadTransactionsList();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
