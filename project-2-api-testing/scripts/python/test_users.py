"""
User API tests using Python unittest.
Validates CRUD operations, field presence, and email format.
"""

import unittest
from api_client import APIClient, APIError


class TestUsersAPI(unittest.TestCase):
    """User API test cases"""

    @classmethod
    def setUpClass(cls):
        """Set up test client"""
        cls.client = APIClient()
        cls.endpoint = '/users'

    @classmethod
    def tearDownClass(cls):
        """Close client session"""
        cls.client.close()

    def test_get_all_users(self):
        """TC01: Get all users returns a non-empty list"""
        response = self.client.get(self.endpoint)
        self.assertIsInstance(response, list)
        self.assertGreater(len(response), 0)
        self.assertIn('id', response[0])
        self.assertIn('name', response[0])
        self.assertIn('email', response[0])

    def test_get_single_user(self):
        """TC02: Get single user by ID"""
        user_id = 1
        response = self.client.get(f'{self.endpoint}/{user_id}')
        self.assertEqual(response['id'], user_id)
        self.assertIn('name', response)
        self.assertIn('email', response)

    def test_create_user(self):
        """TC03: Create a new user"""
        new_user = {
            'name': 'Test User',
            'email': 'test@example.com',
            'username': 'testuser',
        }
        response = self.client.post(self.endpoint, new_user)
        self.assertIn('id', response)
        self.assertEqual(response['name'], new_user['name'])
        self.assertEqual(response['email'], new_user['email'])

    def test_update_user(self):
        """TC04: Update an existing user"""
        user_id = 1
        update_data = {
            'name': 'Updated User',
            'email': 'updated@example.com',
        }
        response = self.client.put(f'{self.endpoint}/{user_id}', update_data)
        self.assertEqual(response['id'], user_id)
        self.assertEqual(response['name'], update_data['name'])

    def test_patch_user(self):
        """TC05: Partially update user"""
        user_id = 1
        patch_data = {'name': 'Patched Name'}
        response = self.client.patch(f'{self.endpoint}/{user_id}', patch_data)
        self.assertEqual(response['id'], user_id)
        self.assertEqual(response['name'], patch_data['name'])

    def test_delete_user(self):
        """TC06: Delete a user"""
        user_id = 1
        response = self.client.delete(f'{self.endpoint}/{user_id}')
        self.assertIsNotNone(response)

    def test_user_not_found(self):
        """TC07: Non-existent user returns 404"""
        with self.assertRaises(APIError) as context:
            self.client.get(f'{self.endpoint}/99999')
        self.assertEqual(context.exception.status_code, 404)

    def test_email_format_validation(self):
        """TC08: All user emails have valid format"""
        response = self.client.get(self.endpoint)
        for user in response:
            self.assertIn('@', user['email'])
            self.assertRegex(user['email'], r'^[\w\.\-]+@[\w\.\-]+\.\w+$')

    def test_required_fields_present(self):
        """TC09: All users have required fields"""
        response = self.client.get(self.endpoint)
        required_fields = ['id', 'name', 'username', 'email']
        for user in response:
            for field in required_fields:
                self.assertIn(field, user)


if __name__ == '__main__':
    unittest.main(verbosity=2)
