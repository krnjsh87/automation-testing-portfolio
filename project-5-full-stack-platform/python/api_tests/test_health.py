import unittest
import requests
import os
import sys

class TestHealth(unittest.TestCase):
    def setUp(self):
        self.base_url = os.environ.get('API_URL', 'https://jsonplaceholder.typicode.com')

    def test_users_api_health(self):
        """Verify Users API is reachable"""
        response = requests.get(f"{self.base_url}/users")
        self.assertEqual(response.status_code, 200)

    def test_posts_api_health(self):
        """Verify Posts API is reachable"""
        response = requests.get(f"{self.base_url}/posts")
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
