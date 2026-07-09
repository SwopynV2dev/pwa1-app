import { db } from "./db";

export const initDatabase = () => {
    console.log("BD LOCAL INICIADA");
    db.execSync(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT,
            email TEXT,
            cellphone TEXT,
            token TEXT,
            companie TEXT,
            profile_photo TEXT
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY NOT NULL,
            id_services_order INTEGER,
            id_quotation INTEGER,
            user_id INTEGER,
            id_payment_method INTEGER,
            id_payment_way INTEGER,
            id_status INTEGER,
            id_job_center INTEGER,
            companie TEXT,
            bussines_name TEXT,
            address TEXT,
            email TEXT,
            observation TEXT,
            total REAL,
            sub_total REAL,
            visible INTEGER
        );
    `);
};