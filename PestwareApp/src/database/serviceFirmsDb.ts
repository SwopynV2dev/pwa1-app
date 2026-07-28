import { db } from "./db";
import { LocalServiceFirm } from "./models";

type NewServiceFirm = Omit<LocalServiceFirm, "id">;

export const saveServiceFirm = (
    firm: NewServiceFirm
): number => {
    const result = db.runSync(
        `
        INSERT INTO service_firms (
            id_service_order,
            file_route,
            other_name,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            firm.id_service_order ?? null,
            firm.file_route ?? null,
            firm.other_name ?? null,
            firm.created_at ?? null,
            firm.updated_at ?? null,
        ]
    );

    return result.lastInsertRowId;
};

export const getServiceFirms = (): LocalServiceFirm[] => {
    return db.getAllSync<LocalServiceFirm>(
        `SELECT * FROM service_firms ORDER BY id DESC`
    );
};

export const getServiceFirmById = (
    id: number
): LocalServiceFirm | null => {
    return db.getFirstSync<LocalServiceFirm>(
        `SELECT * FROM service_firms WHERE id = ?`,
        [id]
    );
};

export const updateServiceFirm = (
    id: number,
    firm: NewServiceFirm
): void => {
    db.runSync(
        `
        UPDATE service_firms
        SET
            id_service_order = ?,
            file_route = ?,
            other_name = ?,
            updated_at = ?
        WHERE id = ?
        `,
        [
            firm.id_service_order ?? null,
            firm.file_route ?? null,
            firm.other_name ?? null,
            firm.updated_at ?? new Date().toISOString(),
            id,
        ]
    );
};

export const deleteServiceFirm = (id: number): void => {
    db.runSync(
        `DELETE FROM service_firms WHERE id = ?`,
        [id]
    );
};