from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('posts/', views.get_posts, name='get_posts'),
    path('posts/create/', views.create_post, name='create_post'),
    path('posts/edit/<int:pk>', views.edit_post, name='edit_post'),
    path('posts/delete/<int:pk>', views.delete_post, name='delete_post'),
    path('posts/<int:pk>/', views.view_post, name='view_post'),
    path('posts/your-posts/', views.get_user_posts, name='get_user_posts'),
    path('posts/user/<int:pk>', views.get_user_post, name='get_user_post'),
    path('user/', views.get_user_info, name='get_user_info'),
]
