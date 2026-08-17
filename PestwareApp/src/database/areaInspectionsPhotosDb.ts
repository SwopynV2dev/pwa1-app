import { db } from "./db";
import { LocalAreaInspectionPhoto } from "./models";

type NewAreaInspectionPhoto = Omit<LocalAreaInspectionPhoto, "id">;

export const saveAreaInspectionPhoto = (
    photo: NewAreaInspectionPhoto
): number => {
    const result = db.runSync(
        `
        INSERT INTO area_inspections_photos (
            id_area_inspection,
            photo,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            photo.id_area_inspection ?? null,
            photo.photo ?? null,
            photo.created_at ?? null,
            photo.updated_at ?? null,
        ]
    );

    return result.lastInsertRowId;
};

export const getPhotosByAreaInspection = (
    areaInspectionId: number
): LocalAreaInspectionPhoto[] => {
    return db.getAllSync<LocalAreaInspectionPhoto>(
        `
        SELECT *
        FROM area_inspections_photos
        WHERE id_area_inspection = ?
        ORDER BY id ASC
        `,
        [areaInspectionId]
    );
};

export const deletePhotosByAreaInspection = (
    areaInspectionId: number
): void => {
    db.runSync(
        `
        DELETE FROM area_inspections_photos
        WHERE id_area_inspection = ?
        `,
        [areaInspectionId]
    );
};