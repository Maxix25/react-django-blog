from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.get_posts, name='get_posts'),
    path('posts/create/', views.create_post, name='create_post'),
    path('posts/<int:pk>/', views.view_post, name='view_post'),
    path('posts/your-posts/', views.get_user_posts, name='get_user_posts'),
    path('user/', views.get_user_info, name='get_user_info'),
]
