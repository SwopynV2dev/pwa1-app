import { apiRequest } from "./apiClient";
import { ENDPOINTS } from "./endpoints";
import { TodayService } from "./types";

export const getTodayServicesByEmployee = async (
    employeeId: number
): Promise<TodayService[]> => {
    return apiRequest<TodayService[]>(
        ENDPOINTS.SERVICES_TODAY_BY_EMPLOYEE(employeeId),
        {
            method: "GET",
        }
    );
};