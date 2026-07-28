import { db } from './db';
import { LocalPlaceInspectionPlagueType } from './models';

type NewPlaceInspectionPlagueType = Omit<
    LocalPlaceInspectionPlagueType,
    'id'
>;

export const savePlaceInspectionPlagueType = (
    plagueType: NewPlaceInspectionPlagueType
): number => {
    const result = db.runSync(
        `
        INSERT INTO place_inspection_plague_types (
            place_inspection_id,
            plague_type_id,
            id_infestation_degree,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            plagueType.place_inspection_id ?? null,
            plagueType.plague_type_id ?? null,
            plagueType.id_infestation_degree ?? null,
            plagueType.created_at ?? null,
            plagueType.updated_at ?? null,
        ]
    );

    return result.lastInsertRowId;
};

export const getPlagueTypesByPlaceInspection = (
    placeInspectionId: number
): LocalPlaceInspectionPlagueType[] => {
    return db.getAllSync<LocalPlaceInspectionPlagueType>(
        `
        SELECT *
        FROM place_inspection_plague_types
        WHERE place_inspection_id = ?
        ORDER BY id ASC
        `,
        [placeInspectionId]
    );
};

export const deletePlagueTypesByPlaceInspection = (
    placeInspectionId: number
): void => {
    db.runSync(
        `
        DELETE FROM place_inspection_plague_types
        WHERE place_inspection_id = ?
        `,
        [placeInspectionId]
    );
};