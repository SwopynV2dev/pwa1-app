export interface LocalUser {
    id: number;
    name: string;
    email: string;
    cellphone?: string;
    token?: string;
    companie?: string;
    profile_photo?: string;
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