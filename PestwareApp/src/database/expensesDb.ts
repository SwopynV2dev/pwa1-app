import { db } from "./db";
import { LocalExpense } from "./models";

export const saveExpenseLocal = (expense: LocalExpense) => {
    db.runSync(
        `INSERT INTO expenses
        (name, description, amount, payment_method, created_at, synced)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            expense.name,
            expense.description ?? null,
            expense.amount,
            expense.payment_method ?? null,
            expense.created_at,
            expense.synced ?? 0,
        ]
    );
};

export const getLocalExpenses = () => {
    return db.getAllSync<LocalExpense>("SELECT * FROM expenses");
};