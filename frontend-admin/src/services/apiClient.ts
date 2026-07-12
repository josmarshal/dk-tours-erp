const BASE_URL = 'http://localhost:3001/api';

/**
 * A central wrapper for API requests.
 * Automatically injects the required Identity Headers for RBAC.
 */
export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  // In a real app, these would come from an Auth Context / JWT token
  headers.set('x-user-id', 'admin-user-123');
  headers.set('x-org-id', 'org-dk-tours-1');

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API Request Failed');
  }

  return data;
}
