const BASE_URL = "";

export async function apiRequest(
    endpoint: string,
    options: RequestInit = {}
) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}`);
    }

    return response.json();
}