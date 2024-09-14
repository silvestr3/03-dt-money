import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

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
  createTransaction: (
    data: Omit<TransactionType, "id" | "createdAt">
  ) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        q: query,
        _order: "desc",
        _sort: "createdAt",
      },
    });

    setTransactions(response.data);
  }

  async function createTransaction(
    data: Omit<TransactionType, "id" | "createdAt">
  ) {
    const { category, description, price, type } = data;

    const response = await api.post("/transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date().toISOString(),
    });

    setTransactions((state) => [response.data, ...state]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
