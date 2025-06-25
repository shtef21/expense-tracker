import { useMemo, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { UseDB } from "../../logic/hooks";

export const ExpenseForm = ({ refetchExpenses, closeForm }) => {
  // Date in format YYYY-MM
  const [date, setDate] = useState("");
  // Number string
  const [amount, setAmount] = useState("");
  const { addExpenseToDb } = UseDB();

  const dataIsValid = useMemo(() => {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
    const isDateValid = dateRegex.test(date);

    const parsedAmount = parseFloat(amount);
    const isAmountValid = !isNaN(parsedAmount) && isFinite(parsedAmount);

    return isDateValid && isAmountValid;
}, [date, amount]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dataIsValid) {
      addExpenseToDb(date, amount)
        .then(() => {
          refetchExpenses();
          closeForm();
        })
        .catch((error) => {
          console.log("Caught error while adding expense to DB:");
          console.log(error);
        });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mb: "5px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h6">Add Expense</Typography>

      <TextField
        label="Month"
        type="month"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!dataIsValid}
      >
        Submit
      </Button>
    </Box>
  );
}
