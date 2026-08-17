import { db } from "./db";

export const initDatabase = () => {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            cellphone TEXT,
            token TEXT,
            companie TEXT,
            profile_photo TEXT
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS profile_job_centers (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT,
            email_personal TEXT,
            business_name TEXT,
            rfc TEXT,
            license TEXT,
            messenger_personal TEXT,
            whatsapp_personal TEXT,
            cellphone TEXT,
            facebook_personal TEXT,
            web_page TEXT,
            health_manager TEXT,
            sanitary_license TEXT,
            warning_service TEXT,
            contract_service TEXT,
            code TEXT,
            companie TEXT,
            image TEXT,
            type TEXT,
            total REAL,
            iva REAL,
            rfc_country TEXT,
            ssid TEXT,
            created_at TEXT,
            updated_at TEXT
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
            visible INTEGER DEFAULT 1,

            FOREIGN KEY (user_id)
                REFERENCES user(id),

            FOREIGN KEY (id_job_center)
                REFERENCES profile_job_centers(id)
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS customer (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT,
            user_id INTEGER,
            establishment_name TEXT,
            cellphone TEXT,
            cellphone_main TEXT,
            establishment_id INTEGER,
            colony TEXT,
            municipality TEXT,
            source_origin_id INTEGER,
            id_profile_job_center INTEGER,
            companie TEXT,
            visible INTEGER DEFAULT 1,
            show_price INTEGER DEFAULT 0,
            days_expiration_certificate INTEGER,
            is_main INTEGER DEFAULT 0,
            customer_main_id INTEGER,
            created_at TEXT,
            updated_at TEXT,

            FOREIGN KEY (user_id)
                REFERENCES user(id),

            FOREIGN KEY (id_profile_job_center)
                REFERENCES profile_job_centers(id),

            FOREIGN KEY (customer_main_id)
                REFERENCES customer(id)
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS area_tree (
            id INTEGER PRIMARY KEY NOT NULL,
            id_area INTEGER,
            id_company INTEGER,
            id_node INTEGER,
            type_node TEXT,
            parent INTEGER,
            text TEXT,
            id_type_area INTEGER,
            visible INTEGER DEFAULT 1,
            created_at TEXT,
            updated_at TEXT
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS monitoring_tree (
            id INTEGER PRIMARY KEY NOT NULL,
            id_monitoring INTEGER,
            id_company INTEGER,
            id_node INTEGER,
            parent INTEGER,
            text TEXT,
            visible INTEGER DEFAULT 1,
            loan INTEGER DEFAULT 0,
            created_at TEXT,
            updated_at TEXT,
            id_type_station INTEGER
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS area_inspections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_area_node INTEGER,
            id_technician INTEGER,
            id_service_order INTEGER,
            date_inspection TEXT,
            hour_inspection TEXT,
            comments TEXT,
            created_at TEXT,
            updated_at TEXT,

            FOREIGN KEY (id_technician)
                REFERENCES user(id)

        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS area_inspections_photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_area_inspection INTEGER,
            photo TEXT,
            created_at TEXT,
            updated_at TEXT,

            FOREIGN KEY (id_area_inspection)
                REFERENCES area_inspections(id)
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS area_inspections_plagues (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_area_inspection INTEGER,
            id_plague INTEGER,
            id_infestation_degree INTEGER,
            created_at TEXT,
            updated_at TEXT,

            FOREIGN KEY (id_area_inspection)
                REFERENCES area_inspections(id)
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS place_inspections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_service_order INTEGER,
            nesting_areas TEXT,
            commentary TEXT,
            created_at TEXT,
            updated_at TEXT
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS place_inspection_plague_types (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            place_inspection_id INTEGER,
            plague_type_id INTEGER,
            id_infestation_degree INTEGER,
            created_at TEXT,
            updated_at TEXT,

            FOREIGN KEY (place_inspection_id)
                REFERENCES place_inspections(id)
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS plague_controls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_service_order INTEGER,
            control_areas TEXT,
            commentary TEXT,
            created_at TEXT,
            updated_at TEXT
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS plague_controls_products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            plague_control_id INTEGER,
            id_product INTEGER,
            dose REAL,
            quantity REAL,
            created_at TEXT,
            updated_at TEXT,

            FOREIGN KEY (plague_control_id)
                REFERENCES plague_controls(id)
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS plague_controls_application_methods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            plague_control_id INTEGER,
            id_application_method INTEGER,
            created_at TEXT,
            updated_at TEXT,

            FOREIGN KEY (plague_control_id)
                REFERENCES plague_controls(id)
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS service_firms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_service_order INTEGER,
            file_route TEXT,
            other_name TEXT,
            created_at TEXT,
            updated_at TEXT
        );
    `);

    db.execSync(`
        CREATE TABLE IF NOT EXISTS cashes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_service_order INTEGER,
            id_event INTEGER,
            id_payment_method INTEGER,
            id_payment_way INTEGER,
            companie TEXT,
            amount_received REAL,
            commentary TEXT,
            payment INTEGER DEFAULT 0,
            created_at TEXT,
            updated_at TEXT
        );
    `);

    console.log("BD LOCAL INICIADA");
};