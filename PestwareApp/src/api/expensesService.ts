import { apiRequest } from "./apiClient";

export const getExpenses = () => {
    return apiRequest("/expenses");
};