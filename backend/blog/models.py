from django.db import models
from django.contrib.auth.models import User


# TODO: Add topics
class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.date_posted}"
