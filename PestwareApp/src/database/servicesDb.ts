import { db } from "./db";
import { LocalService } from "./models";

export const saveServiceLocal = (service: LocalService) => {
    db.runSync(
        `INSERT OR REPLACE INTO services
        (
            id,
            id_services_order,
            id_quotation,
            user_id,
            id_payment_method,
            id_payment_way,
            id_status,
            id_job_center,
            companie,
            bussines_name,
            address,
            email,
            observation,
            total,
            sub_total,
            visible
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            service.id,
            service.id_services_order ?? null,
            service.id_quotation ?? null,
            service.user_id ?? null,
            service.id_payment_method ?? null,
            service.id_payment_way ?? null,
            service.id_status ?? null,
            service.id_job_center ?? null,
            service.companie ?? null,
            service.bussines_name ?? null,
            service.address ?? null,
            service.email ?? null,
            service.observation ?? null,
            service.total ?? null,
            service.sub_total ?? null,
            service.visible ?? 1,
        ]
    );
};

export const getLocalServices = () => {
    return db.getAllSync<LocalService>("SELECT * FROM services WHERE visible = 1");
};