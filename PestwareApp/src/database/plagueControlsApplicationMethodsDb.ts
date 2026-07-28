import { db } from './db';
import { LocalPlagueControlApplicationMethod } from './models';

type NewPlagueControlApplicationMethod = Omit<
    LocalPlagueControlApplicationMethod,
    'id'
>;

export const savePlagueControlApplicationMethod = (
    applicationMethod: NewPlagueControlApplicationMethod
): number => {
    const result = db.runSync(
        `
        INSERT INTO plague_controls_application_methods (
            plague_control_id,
            id_application_method,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            applicationMethod.plague_control_id ?? null,
            applicationMethod.id_application_method ?? null,
            applicationMethod.created_at ?? null,
            applicationMethod.updated_at ?? null,
        ]
    );

    return result.lastInsertRowId;
};

export const getApplicationMethodsByPlagueControl = (
    plagueControlId: number
): LocalPlagueControlApplicationMethod[] => {
    return db.getAllSync<LocalPlagueControlApplicationMethod>(
        `
        SELECT *
        FROM plague_controls_application_methods
        WHERE plague_control_id = ?
        ORDER BY id ASC
        `,
        [plagueControlId]
    );
};

export const deleteApplicationMethodsByPlagueControl = (
    plagueControlId: number
): void => {
    db.runSync(
        `
        DELETE FROM plague_controls_application_methods
        WHERE plague_control_id = ?
        `,
        [plagueControlId]
    );
};