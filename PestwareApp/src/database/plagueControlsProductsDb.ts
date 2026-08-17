import { db } from './db';
import { LocalPlagueControlProduct } from './models';

type NewPlagueControlProduct = Omit<
    LocalPlagueControlProduct,
    'id'
>;

export const savePlagueControlProduct = (
    product: NewPlagueControlProduct
): number => {
    const result = db.runSync(
        `
        INSERT INTO plague_controls_products (
            plague_control_id,
            id_product,
            dose,
            quantity,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            product.plague_control_id ?? null,
            product.id_product ?? null,
            product.dose ?? null,
            product.quantity ?? null,
            product.created_at ?? null,
            product.updated_at ?? null,
        ]
    );

    return result.lastInsertRowId;
};

export const getProductsByPlagueControl = (
    plagueControlId: number
): LocalPlagueControlProduct[] => {
    return db.getAllSync<LocalPlagueControlProduct>(
        `
        SELECT *
        FROM plague_controls_products
        WHERE plague_control_id = ?
        ORDER BY id ASC
        `,
        [plagueControlId]
    );
};

export const deleteProductsByPlagueControl = (
    plagueControlId: number
): void => {
    db.runSync(
        `
        DELETE FROM plague_controls_products
        WHERE plague_control_id = ?
        `,
        [plagueControlId]
    );
};