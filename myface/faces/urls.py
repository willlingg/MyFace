from django.urls import path
from .views import post_list, post_detail, user_post
from django.conf.urls import url

urlpatterns = [   
    url(r'^api/post/$', post_list),
    url(r'^api/post/(?P<pk>[0-9]+)$', post_detail),
    url(r'api/post/user', user_post),
]