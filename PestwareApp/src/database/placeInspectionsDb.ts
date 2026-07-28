import { db } from "./db";
import { LocalPlaceInspection } from "./models";

type NewPlaceInspection = Omit<LocalPlaceInspection, "id">;

export const savePlaceInspection = (
    inspection: NewPlaceInspection
): number => {
    const result = db.runSync(
        `
        INSERT INTO place_inspections (
            id_service_order,
            nesting_areas,
            commentary,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            inspection.id_service_order ?? null,
            inspection.nesting_areas ?? null,
            inspection.commentary ?? null,
            inspection.created_at ?? null,
            inspection.updated_at ?? null,
        ]
    );

    return result.lastInsertRowId;
};

export const getPlaceInspections = (): LocalPlaceInspection[] => {
    return db.getAllSync<LocalPlaceInspection>(
        `SELECT * FROM place_inspections ORDER BY id DESC`
    );
};

export const getPlaceInspectionById = (
    id: number
): LocalPlaceInspection | null => {
    return db.getFirstSync<LocalPlaceInspection>(
        `SELECT * FROM place_inspections WHERE id = ?`,
        [id]
    );
};

export const updatePlaceInspection = (
    id: number,
    inspection: NewPlaceInspection
): void => {
    db.runSync(
        `
        UPDATE place_inspections
        SET
            id_service_order = ?,
            nesting_areas = ?,
            commentary = ?,
            updated_at = ?
        WHERE id = ?
        `,
        [
            inspection.id_service_order ?? null,
            inspection.nesting_areas ?? null,
            inspection.commentary ?? null,
            inspection.updated_at ?? new Date().toISOString(),
            id,
        ]
    );
};

export const deletePlaceInspection = (id: number): void => {
    db.runSync(
        `DELETE FROM place_inspections WHERE id = ?`,
        [id]
    );
};