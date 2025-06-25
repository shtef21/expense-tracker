
export const makeDbExpense = (monthIso, amountStr) => ({
  // YYYY-MM
  monthIso,
  // Mmm YYYY
  monthStr: new Date(`${monthIso}-01`)
    .toLocaleDateString("en-US", { month: "short", year: "numeric" }),
  // Float
  amount: parseFloat(amountStr),
  // Unix epoch (milliseconds since 1970)
  createdAt: Date.now(),
});

export const cummulateExpenses = (expensesArr) =>
  Object.values(
    expensesArr.reduce((acc, curr) => {
      const { monthIso, monthStr, amount } = curr;
      if (!acc[monthIso]) {
        acc[monthIso] = { monthIso, monthStr, amount };
      } else {
        acc[monthIso].amount += amount;
      }
      return acc;
    }, {})
  );
