import { db } from "./db";
import { LocalCash } from "./models";

type NewCash = Omit<LocalCash, "id">;

export const saveCash = (cash: NewCash): number => {
    const result = db.runSync(
        `
        INSERT INTO cashes (
            id_service_order,
            id_event,
            id_payment_method,
            id_payment_way,
            companie,
            amount_received,
            commentary,
            payment,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            cash.id_service_order ?? null,
            cash.id_event ?? null,
            cash.id_payment_method ?? null,
            cash.id_payment_way ?? null,
            cash.companie ?? null,
            cash.amount_received ?? null,
            cash.commentary ?? null,
            cash.payment ?? 0,
            cash.created_at ?? null,
            cash.updated_at ?? null,
        ]
    );

    return result.lastInsertRowId;
};

export const getCashes = (): LocalCash[] => {
    return db.getAllSync<LocalCash>(
        `SELECT * FROM cashes ORDER BY id DESC`
    );
};

export const getCashById = (id: number): LocalCash | null => {
    return db.getFirstSync<LocalCash>(
        `SELECT * FROM cashes WHERE id = ?`,
        [id]
    );
};

export const updateCash = (
    id: number,
    cash: NewCash
): void => {
    db.runSync(
        `
        UPDATE cashes
        SET
            id_service_order = ?,
            id_event = ?,
            id_payment_method = ?,
            id_payment_way = ?,
            companie = ?,
            amount_received = ?,
            commentary = ?,
            payment = ?,
            updated_at = ?
        WHERE id = ?
        `,
        [
            cash.id_service_order ?? null,
            cash.id_event ?? null,
            cash.id_payment_method ?? null,
            cash.id_payment_way ?? null,
            cash.companie ?? null,
            cash.amount_received ?? null,
            cash.commentary ?? null,
            cash.payment ?? 0,
            cash.updated_at ?? new Date().toISOString(),
            id,
        ]
    );
};

export const deleteCash = (id: number): void => {
    db.runSync(
        `DELETE FROM cashes WHERE id = ?`,
        [id]
    );
};