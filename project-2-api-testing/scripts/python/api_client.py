"""
Python API Client for REST API testing.
Provides a session-based HTTP client with full CRUD operations.
"""

import requests
import json
from typing import Dict, List, Any, Optional
from urllib.parse import urljoin


class APIError(Exception):
    """Custom exception for API errors"""
    def __init__(self, message: str, status_code: int, response_body: str):
        self.message = message
        self.status_code = status_code
        self.response_body = response_body
        super().__init__(self.message)


class APIClient:
    """Main API Client for REST API testing"""

    def __init__(self, base_url: Optional[str] = None, timeout: int = 5):
        """
        Initialize API Client

        Args:
            base_url: Base URL for API (defaults to JSONPlaceholder)
            timeout: Request timeout in seconds
        """
        self.base_url = base_url or 'https://jsonplaceholder.typicode.com'
        self.timeout = timeout
        self.session = requests.Session()
        self.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        self.session.headers.update(self.headers)

    def set_auth_token(self, token: str, auth_type: str = 'Bearer') -> None:
        """Set authentication token"""
        self.session.headers['Authorization'] = f'{auth_type} {token}'

    def set_api_key(self, api_key: str, header_name: str = 'X-API-Key') -> None:
        """Set API key authentication"""
        self.session.headers[header_name] = api_key

    def _request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict[str, Any]] = None,
        headers: Optional[Dict[str, str]] = None,
        **kwargs
    ) -> Any:
        """
        Generic request method

        Args:
            method: HTTP method (GET, POST, PUT, PATCH, DELETE)
            endpoint: API endpoint
            data: Request body data
            headers: Custom headers

        Returns:
            Response data as dictionary or list
        """
        url = f"{self.base_url}{endpoint}"
        request_headers = dict(self.session.headers)
        if headers:
            request_headers.update(headers)

        try:
            response = self.session.request(
                method=method,
                url=url,
                json=data,
                headers=request_headers,
                timeout=self.timeout,
                **kwargs
            )

            if response.status_code >= 400:
                raise APIError(
                    f'HTTP {response.status_code}: {response.reason}',
                    response.status_code,
                    response.text
                )

            if response.content:
                try:
                    return response.json()
                except json.JSONDecodeError:
                    return response.text
            return None

        except requests.exceptions.RequestException as e:
            raise APIError(str(e), 0, '')

    def get(self, endpoint: str, headers: Optional[Dict[str, str]] = None) -> Any:
        """GET request"""
        return self._request('GET', endpoint, headers=headers)

    def post(self, endpoint: str, data: Dict[str, Any], headers: Optional[Dict[str, str]] = None) -> Any:
        """POST request"""
        return self._request('POST', endpoint, data=data, headers=headers)

    def put(self, endpoint: str, data: Dict[str, Any], headers: Optional[Dict[str, str]] = None) -> Any:
        """PUT request"""
        return self._request('PUT', endpoint, data=data, headers=headers)

    def patch(self, endpoint: str, data: Dict[str, Any], headers: Optional[Dict[str, str]] = None) -> Any:
        """PATCH request"""
        return self._request('PATCH', endpoint, data=data, headers=headers)

    def delete(self, endpoint: str, headers: Optional[Dict[str, str]] = None) -> Any:
        """DELETE request"""
        return self._request('DELETE', endpoint, headers=headers)

    def close(self) -> None:
        """Close session"""
        self.session.close()


if __name__ == "__main__":
    client = APIClient()

    # Test GET
    users = client.get("/users")
    print(f"Fetched {len(users)} users")

    # Test POST
    new_user = {"name": "Test User", "email": "test@example.com", "username": "testuser"}
    response = client.post("/users", new_user)
    print(f"Created user with ID: {response.get('id')}")

    # Test PUT
    update_response = client.put("/users/1", {"name": "Updated User"})
    print(f"Updated user: {update_response.get('name')}")

    # Test DELETE
    delete_response = client.delete("/users/1")
    print(f"Deleted user: {delete_response}")

    client.close()
    print("\nAll API operations completed successfully!")
