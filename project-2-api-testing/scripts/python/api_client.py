import requests
import json

class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    def get(self, endpoint):
        response = requests.get(f"{self.base_url}{endpoint}", headers=self.headers)
        response.raise_for_status()
        return response.json()

    def post(self, endpoint, data):
        response = requests.post(f"{self.base_url}{endpoint}", headers=self.headers, data=json.dumps(data))
        response.raise_for_status()
        return response.json()

if __name__ == "__main__":
    client = APIClient("https://jsonplaceholder.typicode.com")
    
    # Test GET
    users = client.get("/users")
    print(f"Fetched {len(users)} users")
    
    # Test POST
    new_user = {"name": "Test User"}
    response = client.post("/users", new_user)
    print(f"Created user with ID: {response.get('id')}")
