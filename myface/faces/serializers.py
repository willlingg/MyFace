from rest_framework import serializers
from .models import Post

class PostSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('pk', 'author', 'title', 'text', 'created_date', 'published_date', 'post_image')

