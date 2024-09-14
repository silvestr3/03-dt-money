import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchTransactionFormSchema = z.object({
  query: z.string(),
});

type SearchTransactionFormType = z.infer<typeof searchTransactionFormSchema>;

export const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchTransactionFormType>({
    resolver: zodResolver(searchTransactionFormSchema),
    defaultValues: {
      query: "",
    },
  });

  async function handleSearchTransactions(data: SearchTransactionFormType) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(data);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
