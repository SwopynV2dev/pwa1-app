import { apiRequest } from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export const login = (data: any) => {
    return apiRequest(ENDPOINTS.LOGIN, {
        method: "POST",
        body: JSON.stringify(data),
    });
};