import { apiRequest } from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export const getServices = () => {
    return apiRequest(ENDPOINTS.SERVICES);
};

export const getServiceById = (id: number) => {
    return apiRequest(ENDPOINTS.SERVICE_DETAIL(id));
};