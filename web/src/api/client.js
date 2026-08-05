const BASE_URL = 'http://localhost:3001/api';

export async function request(url, options = {}) {
    const isFormData = options.body instanceof FormData;
    const headers = {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
    };

    let body = options.body;
    if (body && typeof body === 'object' && !isFormData) {
        body = JSON.stringify(body);
    }

    const config = {
        ...options,
        headers,
        ...(body && { body })
    };

    const response = await fetch(`${BASE_URL}/${url}`, config);
    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
        ? await response.json()
        : await response.text();
    
    if (!response.ok) {
        const message = payload?.message || payload?.error || `Request failed with status ${response.status}`;
        throw new Error(message);
    }
    
    return payload;
}
