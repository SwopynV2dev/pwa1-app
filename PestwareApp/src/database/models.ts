export interface LocalUser {
    id: number;
    name: string;
    email: string;
    cellphone?: string;
    token?: string;
    companie?: string;
    profile_photo?: string;
}

export interface LocalProfileJobCenter {
    id: number;
    name?: string;
    email_personal?: string;
    business_name?: string;
    rfc?: string;
    license?: string;
    messenger_personal?: string;
    whatsapp_personal?: string;
    cellphone?: string;
    facebook_personal?: string;
    web_page?: string;
    health_manager?: string;
    sanitary_license?: string;
    warning_service?: string;
    contract_service?: string;
    code?: string;
    companie?: string;
    image?: string;
    type?: string;
    total?: number;
    iva?: number;
    rfc_country?: string;
    ssid?: string;
    created_at?: string;
    updated_at?: string;
}

export interface LocalService {
    id: number;
    id_services_order?: number;
    id_quotation?: number;
    user_id?: number;
    id_payment_method?: number;
    id_payment_way?: number;
    id_status?: number;
    id_job_center?: number;
    companie?: string;
    bussines_name?: string;
    address?: string;
    email?: string;
    observation?: string;
    total?: number;
    sub_total?: number;
    visible?: number;
}

export interface LocalCustomer {
    id: number;
    name?: string;
    user_id?: number;
    establishment_name?: string;
    cellphone?: string;
    cellphone_main?: string;
    establishment_id?: number;
    colony?: string;
    municipality?: string;
    source_origin_id?: number;
    id_profile_job_center?: number;
    companie?: string;
    visible?: number;
    show_price?: number;
    days_expiration_certificate?: number;
    is_main?: number;
    customer_main_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface LocalAreaTree {
    id: number;
    id_area?: number;
    id_company?: number;
    id_node?: number;
    type_node?: string;
    parent?: number;
    text?: string;
    id_type_area?: number;
    visible?: number;
    created_at?: string;
    updated_at?: string;
}

export interface LocalMonitoringTree {
    id: number;
    id_monitoring?: number;
    id_company?: number;
    id_node?: number;
    parent?: number;
    text?: string;
    visible?: number;
    loan?: number;
    created_at?: string;
    updated_at?: string;
    id_type_station?: number;
}

export interface LocalAreaInspection {
    id: number;
    id_area_node?: number;
    id_technician?: number;
    id_service_order?: number;
    date_inspection?: string;
    hour_inspection?: string;
    comments?: string;
    created_at?: string;
    updated_at?: string;
}

export interface LocalAreaInspectionPhoto {
    id: number;
    id_area_inspection?: number;
    photo?: string;
    created_at?: string;
    updated_at?: string;
}

export interface LocalAreaInspectionPlague {
    id: number;
    id_area_inspection?: number;
    id_plague?: number;
    id_infestation_degree?: number;
    created_at?: string;
    updated_at?: string;
}

export interface LocalPlaceInspection {
    id: number;
    id_service_order?: number;
    nesting_areas?: string;
    commentary?: string;
    created_at?: string;
    updated_at?: string;
}

export interface LocalPlaceInspectionPlagueType {
    id: number;
    place_inspection_id?: number;
    plague_type_id?: number;
    id_infestation_degree?: number;
    created_at?: string;
    updated_at?: string;
}

export interface LocalPlagueControl {
    id: number;
    id_service_order?: number;
    control_areas?: string;
    commentary?: string;
    created_at?: string;
    updated_at?: string;
}

export interface LocalPlagueControlProduct {
    id: number;
    plague_control_id?: number;
    id_product?: number;
    dose?: number;
    quantity?: number;
    created_at?: string;
    updated_at?: string;
}

export interface LocalPlagueControlApplicationMethod {
    id: number;
    plague_control_id?: number;
    id_application_method?: number;
    created_at?: string;
    updated_at?: string;
}

export interface LocalServiceFirm {
    id: number;
    id_service_order?: number;
    file_route?: string;
    other_name?: string;
    created_at?: string;
    updated_at?: string;
}

export interface LocalCash {
    id: number;
    id_service_order?: number;
    id_event?: number;
    id_payment_method?: number;
    id_payment_way?: number;
    companie?: string;
    amount_received?: number;
    commentary?: string;
    payment?: number;
    created_at?: string;
    updated_at?: string;
}