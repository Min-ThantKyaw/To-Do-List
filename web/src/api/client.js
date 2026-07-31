const BASE_URL = 'http://localhost:3001/api';

export async function request(url, options = {}) {
    // 1. Prepare modern default headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers, // Allow overriding or adding tokens
    };

    // 2. Automatically stringify the body if it's a plain object
    let body = options.body;
    if (body && typeof body === 'object' && !(body instanceof FormData)) {
        body = JSON.stringify(body);
    }

    // 3. Merge everything into the final config
    const config = {
        ...options,
        headers,
        ...(body && { body }) // Only include body if it exists
    };

    console.log(`Fetching: ${BASE_URL}/${url}`, config);

    let response = await fetch(`${BASE_URL}/${url}`, config);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
    }
    
    return response.json();
}