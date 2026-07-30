const BASE_URL = 'https://pestwareapp.com';

export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Error HTTP ${response.status}`
        );
    }

    return response.json() as Promise<T>;
}