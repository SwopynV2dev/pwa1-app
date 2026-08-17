import { db } from './db';
import { LocalAreaInspection } from './models';

type NewAreaInspection = Omit<LocalAreaInspection, 'id'>;

export const saveAreaInspection = (
    inspection: NewAreaInspection
): number => {
    const result = db.runSync(
        `
        INSERT INTO area_inspections (
            id_area_node,
            id_technician,
            id_service_order,
            date_inspection,
            hour_inspection,
            comments,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            inspection.id_area_node ?? null,
            inspection.id_technician ?? null,
            inspection.id_service_order ?? null,
            inspection.date_inspection ?? null,
            inspection.hour_inspection ?? null,
            inspection.comments ?? null,
            inspection.created_at ?? null,
            inspection.updated_at ?? null,
        ]
    );

    return result.lastInsertRowId;
};

export const getAreaInspections = (): LocalAreaInspection[] => {
    return db.getAllSync<LocalAreaInspection>(
        `SELECT * FROM area_inspections ORDER BY id DESC`
    );
};

export const getAreaInspectionById = (
    id: number
): LocalAreaInspection | null => {
    return db.getFirstSync<LocalAreaInspection>(
        `SELECT * FROM area_inspections WHERE id = ?`,
        [id]
    );
};

export const getAreaInspectionsByServiceOrder = (
    serviceOrderId: number
): LocalAreaInspection[] => {
    return db.getAllSync<LocalAreaInspection>(
        `
        SELECT *
        FROM area_inspections
        WHERE id_service_order = ?
        ORDER BY id DESC
        `,
        [serviceOrderId]
    );
};

export const updateAreaInspection = (
    id: number,
    inspection: NewAreaInspection
): void => {
    db.runSync(
        `
        UPDATE area_inspections
        SET
            id_area_node = ?,
            id_technician = ?,
            id_service_order = ?,
            date_inspection = ?,
            hour_inspection = ?,
            comments = ?,
            updated_at = ?
        WHERE id = ?
        `,
        [
            inspection.id_area_node ?? null,
            inspection.id_technician ?? null,
            inspection.id_service_order ?? null,
            inspection.date_inspection ?? null,
            inspection.hour_inspection ?? null,
            inspection.comments ?? null,
            inspection.updated_at ?? new Date().toISOString(),
            id,
        ]
    );
};

export const deleteAreaInspection = (id: number): void => {
    db.runSync(
        `DELETE FROM area_inspections WHERE id = ?`,
        [id]
    );
};