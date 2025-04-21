from .test_setup import TestAuthenticationSetup
from rest_framework import status
from django.urls import reverse


class TestRegister(TestAuthenticationSetup):
    def test_register_user(self):
        response = self.client.post(reverse('register'), {
            'username': 'newuser',
            'password': 'newpassword',
            'email': 'testemail@email.com'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], 'newuser')
        self.assertEqual(response.data['email'], 'testemail@email.com')
        self.assertTrue('password' not in response.data)
