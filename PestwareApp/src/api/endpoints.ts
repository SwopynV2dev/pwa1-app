export const ENDPOINTS = {
    LOGIN: "/login",
    LOGOUT: "/logout",

    SERVICES: "/services",
    SERVICE_DETAIL: (id: number) => `/services/${id}`,

    EXPENSES: "/expenses",

    INVENTORY: "/inventory",

    AGENDA: "/agenda",

    INSPECTIONS: "/inspections",
};