from rest_framework import serializers
from .models import Post

class PostSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('author', 'title', 'text', 'post_image')

