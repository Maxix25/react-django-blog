from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id']


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        user = self.context.get('request').user
        post = Post.objects.create(author=user, **validated_data)
        return post
