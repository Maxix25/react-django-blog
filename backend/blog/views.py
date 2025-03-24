from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from .models import Post
from .serializers import PostSerializer, UserSerializer


@api_view(['GET'])
def get_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer = PostSerializer(
        data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED, data=serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)


@api_view(['GET'])
def view_post(request, pk):
    post = Post.objects.get(id=pk)
    serializer = PostSerializer(post)
    response = Response(status=status.HTTP_200_OK, data=serializer.data)
    return response


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_posts(request):
    posts = Post.objects.filter(author=request.user)
    serializer = PostSerializer(posts, many=True)
    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(status=status.HTTP_200_OK, data=serializer.data)
