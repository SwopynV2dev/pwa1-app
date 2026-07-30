export const ENDPOINTS = {
    LOGIN: "/api/js/session/login",
    LOGOUT: "/logout",

    SERVICES_TODAY_BY_EMPLOYEE: (employeeId: number) =>
        `/api/js/services/today/employee/${employeeId}`,

    SERVICE_DETAIL: (id: number) => `/services/${id}`,

    EXPENSES: "/expenses",
    INVENTORY: "/inventory",
    AGENDA: "/agenda",
    INSPECTIONS: "/inspections",
};