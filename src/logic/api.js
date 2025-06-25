import { useQuery } from "@tanstack/react-query";
import { UseDB } from "./hooks";

/*
Raw data:
  {
    "id": "-OTO12K_RLWCIzGj0ISS",
    "amount": 150,
    "createdAt": 1750619142363,
    "dateStr": "2025-01"
  }
Prepared (with select):
  { "id": 1, "month": "Jan 2025", "expenses": 1200 }
*/

export const useExpensesData = () => {
  const { readExpensesFromDb } = UseDB();

  return useQuery({
    queryKey: ['expenses'],
    queryFn: () => readExpensesFromDb(),
    select: (expenses) => {
      // Sort by month ascending
      expenses.sort((a, b) => a.monthIso.localeCompare(b.monthIso));
      return expenses;
    }
  });
}
