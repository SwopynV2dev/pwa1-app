import { db } from "./db";
import { LocalAreaInspectionPlague } from "./models";

type NewAreaInspectionPlague = Omit<
    LocalAreaInspectionPlague,
    "id"
>;

export const saveAreaInspectionPlague = (
    plague: NewAreaInspectionPlague
): number => {
    const result = db.runSync(
        `
        INSERT INTO area_inspections_plagues (
            id_area_inspection,
            id_plague,
            id_infestation_degree,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            plague.id_area_inspection ?? null,
            plague.id_plague ?? null,
            plague.id_infestation_degree ?? null,
            plague.created_at ?? null,
            plague.updated_at ?? null,
        ]
    );

    return result.lastInsertRowId;
};

export const getPlaguesByAreaInspection = (
    areaInspectionId: number
): LocalAreaInspectionPlague[] => {
    return db.getAllSync<LocalAreaInspectionPlague>(
        `
        SELECT *
        FROM area_inspections_plagues
        WHERE id_area_inspection = ?
        ORDER BY id ASC
        `,
        [areaInspectionId]
    );
};

export const deletePlaguesByAreaInspection = (
    areaInspectionId: number
): void => {
    db.runSync(
        `
        DELETE FROM area_inspections_plagues
        WHERE id_area_inspection = ?
        `,
        [areaInspectionId]
    );
};