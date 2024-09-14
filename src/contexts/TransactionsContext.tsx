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
  fetchTransactions: (query?: string) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  async function fetchTransactions(query?: string) {
    const url = new URL(`${Env.API_URL}/transactions`);

    if (query) {
      url.searchParams.append("q", query);
    }

    const data = await fetch(url);
    const transactions = await data.json();

    setTransactions(transactions);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
