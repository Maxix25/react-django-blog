from .test_setup import TestAuthenticationSetup
from rest_framework import status
from django.urls import reverse


class TestDeletePost(TestAuthenticationSetup):
    def test_delete_post(self):
        # Create a post to test with
        response = self.client.post(reverse('create_post'), {
            'title': 'Test Post',
            'content': 'This is a test post.',
            'author': self.user.id
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        post_id = response.data['id']
        # Delete the post
        response = self.client.delete(
            reverse('delete_post', kwargs={'pk': post_id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data, {'message': 'Post deleted successfully'}
        )
