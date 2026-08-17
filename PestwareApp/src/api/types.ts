export interface LoginRequest {
    Username: string;
    Password: string;
}

export interface LoginResponse {
    loginCode: number;
    employee_id: number;
    user_id: number;
    user_name: string;
    email: string;
    id_company: number;
    id_job_center: number;
    jobcenter: string;
    role_id: number;
    created_at: string;
    job_title: string;
    symbol_country: string;
    ssid: string | null;
}

export interface TodayService {
    id: number;
    title: string;
    id_employee: number;
    initial_hour: string;
    final_hour: string;
    initial_date: string;
    customer: string;
    cellphone: string;
    colony: string;
    establishment_name: string;
    total: number;
    street: string;
    address_number: string;
    plague: string;
    color: string;
    id_service_order: string;
    idSo: number;
    observations: string;
    status: number;
    user_schedule_service: string;
    email: string;
    warranty: number;
    reinforcement: number;
    tracing: number;
    service_type: number;
    state: string;
    municipality: string;
    id_price_list: number;
    construction_measure: number;
    pr: number;
    customer_branch_id: number;
    customer_id: number;
    quotation_id: number;
    companyId: number;
    is_shared: number;
    is_main: number;
    inspection: number;
    technician: string;
    plagues_quote: string;
    monitoring: number;
    type: string;
    price_reinforcement: number;
    empresa: string;
    address: string;
    aditionalAddress: string;
    date: string;
    hour: string;
    totalC: string;
    id_order_encode: string;
    etiqueta: string;
    etiqueta_payment: string;
    etiqueta_color: string;
    payment: number;
    conditions: string;
    inhabitants: string;
    mascots: string;
}