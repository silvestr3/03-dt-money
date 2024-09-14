import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormType = z.infer<typeof newTransactionFormSchema>;

export const NewTransactionModal = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormType>({
    resolver: zodResolver(newTransactionFormSchema),
  });

  const { createTransaction } = useContext(TransactionsContext);

  async function handleCreateNewTransaction(data: NewTransactionFormType) {
    createTransaction(data);

    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />{" "}
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            {...register("description")}
            placeholder="Descrição"
            required
          />
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            placeholder="Preço"
            required
          />
          <input
            type="text"
            {...register("category")}
            placeholder="Categoria"
            required
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TransactionType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton value="income" variant="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton value="outcome" variant="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button disabled={isSubmitting} type="submit">
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
};
