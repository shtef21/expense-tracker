import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  ref,
  push,
  get,
  remove,
  update,
} from "firebase/database";
import { ENV } from "../config";
import { makeDbExpense } from "./helpers";

const firebaseConfig = {
  apiKey: ENV.fbApiKey,
  authDomain: ENV.fbAuthDomain,
  projectId: ENV.fbProjectId,
  storageBucket: ENV.fbStorageBucket,
  messagingSenderId: ENV.fbMessagingSenderId,
  appId: ENV.appId,
  databaseURL: ENV.fbDatabaseUrl,
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const UseDB = () => {
  // ➕ Add an entry to any table
  const addExpenseToDb = (monthIso, amountStr) =>
    push(ref(database, "expenses"), makeDbExpense(monthIso, amountStr));

  // 📥 Read all entries from a table
  const readExpensesFromDb = async () => {
    const snapshot = await get(ref(database, "expenses"));
    if (!snapshot.exists()) return [];

    const data = snapshot.val();
    return Object.entries(data).map(([id, item]) => ({
      id,
      ...item,
    }));
  };

  // ❌ Remove an entry by ID
  const removeExpenseFromDb = async (expenseId) => {
    await remove(ref(database, `expenses/${expenseId}`));
  };

  // ✏️ Update an entry by ID
  const updateExpenseInDb = async (expenseId, updatedFields) => {
    await update(ref(database, `expenses/${expenseId}`), updatedFields);
  };

  return {
    addExpenseToDb,
    readExpensesFromDb,
    removeExpenseFromDb,
    updateExpenseInDb,
  };
};
