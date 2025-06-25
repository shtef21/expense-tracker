import { useMemo, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useExpensesData } from "../logic/api";
import { ExpenseChart } from "./expense-components/ExpenseChart";
import { ExpenseTable } from "./expense-components/ExpenseTable";
import { ModalContainer } from "./common-components/ModalContainer";
import { ExpenseForm } from "./expense-components/ExpenseForm";
import { UseDB } from "../logic/hooks";
import { cummulateExpenses, makeDbExpense } from "../logic/helpers";

export const ChartContainer = () => {
  // eslint-disable-next-line no-unused-vars
  const { data: expensesData = [], isFetching, refetch, error } = useExpensesData();
  const { removeExpenseFromDb, updateExpenseInDb } = UseDB();
  const [ modalOpen, setModalOpen ] = useState(false);
  const cummulatedExpenses = useMemo(() => cummulateExpenses(expensesData), [expensesData]);

  const handleEdit = async (editedObj) => {
    const expenseObj = makeDbExpense(editedObj.monthIso, editedObj.amountStr);
    await updateExpenseInDb(editedObj.id, expenseObj);
    refetch();
  };

  const handleDelete = async (deleteId) => {
    await removeExpenseFromDb(deleteId)
    refetch();
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid sx={{ mt: 3 }} container alignItems="center" spacing={1}>
        <Grid>
          <img src="/vite.svg" alt="Vite Logo" width={48} height={48} />
        </Grid>
        <Grid>
          <Typography variant="h4" component="h1">
            Expense tracker app
            {/* TODO: add Auth to app */}
          </Typography>
        </Grid>
      </Grid>

      <Grid>
        <ExpenseChart data={cummulatedExpenses} />
      </Grid>

      <Grid sx={{ width: "100%", maxWidth: 700 }}>
        <ExpenseTable
          data={expensesData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Grid>

      <Grid sx={{ width: "100%", maxWidth: 700 }}>
        <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
            fullWidth
        >
          Add entry
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={isFetching}
          onClick={refetch}
          fullWidth
        >
          Refetch
        </Button>
      </Grid>

      <ModalContainer
        open={modalOpen}
        setOpen={setModalOpen}
        refetch={refetch}
      >
        <ExpenseForm
          refetchExpenses={refetch}
          closeForm={() => setModalOpen(false)}
        />
      </ModalContainer>
    </Grid>
  );
};
