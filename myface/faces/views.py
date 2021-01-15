from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Post
from .serializers import *


@api_view(['GET', 'POST'])
def post_list(request):
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        posts = Post.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(posts, 10)

        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)
        
        serializer = PostSeralizer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/post/?page=' + str(nextPage), 'prevlink': '/api/post/?page=' + str(previousPage)})

    elif request.method == 'POST':
        request.data['author'] = request.user.id        
        serializer = PostSeralizer(data=request.data, context={'request': request})        
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, pk):
    """
    Retrieve, update or delete a post by id/pk.
    """    
    try:
        post = Post.objects.get(pk=pk)        
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PostSeralizer(post, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PostSeralizer(post, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def user_post(request):
    """
    Retrieve, update or delete a post by username
    """    
    try:
        posts = Post.objects.filter(author=request.user).order_by('-created_date')       
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':               
        data = []
        nextPage = 1
        previousPage = 1        
        page = request.GET.get('page', 1)
        paginator = Paginator(posts, 10)

        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)
        
        serializer = PostSeralizer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/post/?page=' + str(nextPage), 'prevlink': '/api/post/?page=' + str(previousPage)})     