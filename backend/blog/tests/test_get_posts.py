from .test_setup import TestAuthenticationSetup
from rest_framework import status
from django.urls import reverse


class TestGetPosts(TestAuthenticationSetup):
    def test_get_posts(self):
        # Create a post to test with
        response = self.client.post(reverse('create_post'), {
            'title': 'Test Post',
            'content': 'This is a test post.',
            'author': self.user.id
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Get the posts
        response = self.client.get(reverse('get_posts'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Post')
