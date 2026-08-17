import { apiRequest } from "./apiClient";
import { ENDPOINTS } from "./endpoints";
import { LoginRequest, LoginResponse } from "./types";
import { saveUserLocal } from "../database/userDb";

export const login = async (
    credentials: LoginRequest
): Promise<LoginResponse> => {
    const response = await apiRequest<LoginResponse>(
        ENDPOINTS.LOGIN,
        {
            method: "POST",
            body: JSON.stringify(credentials),
        }
    );

    if (response.loginCode === 1) {
        saveUserLocal({
            id: response.user_id,
            name: response.user_name,
            email: response.email,
            companie: response.jobcenter,
        });
    }

    return response;
};