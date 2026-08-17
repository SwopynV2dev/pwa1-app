import { db } from './db';
import { LocalPlagueControl } from './models';

type NewPlagueControl = Omit<LocalPlagueControl, 'id'>;

export const savePlagueControl = (
    plagueControl: NewPlagueControl
): number => {
    const result = db.runSync(
        `
        INSERT INTO plague_controls (
            id_service_order,
            control_areas,
            commentary,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            plagueControl.id_service_order ?? null,
            plagueControl.control_areas ?? null,
            plagueControl.commentary ?? null,
            plagueControl.created_at ?? null,
            plagueControl.updated_at ?? null,
        ]
    );

    return result.lastInsertRowId;
};

export const getPlagueControls = (): LocalPlagueControl[] => {
    return db.getAllSync<LocalPlagueControl>(
        `SELECT * FROM plague_controls ORDER BY id DESC`
    );
};

export const getPlagueControlById = (
    id: number
): LocalPlagueControl | null => {
    return db.getFirstSync<LocalPlagueControl>(
        `SELECT * FROM plague_controls WHERE id = ?`,
        [id]
    );
};

export const updatePlagueControl = (
    id: number,
    plagueControl: NewPlagueControl
): void => {
    db.runSync(
        `
        UPDATE plague_controls
        SET
            id_service_order = ?,
            control_areas = ?,
            commentary = ?,
            updated_at = ?
        WHERE id = ?
        `,
        [
            plagueControl.id_service_order ?? null,
            plagueControl.control_areas ?? null,
            plagueControl.commentary ?? null,
            plagueControl.updated_at ?? new Date().toISOString(),
            id,
        ]
    );
};

export const deletePlagueControl = (id: number): void => {
    db.runSync(
        `DELETE FROM plague_controls WHERE id = ?`,
        [id]
    );
};