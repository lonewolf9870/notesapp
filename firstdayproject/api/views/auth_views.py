from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

@api_view(["POST"])
def register(request):
      username = request.data.get("username")
      password = request.data.get("password")
       
      if User.objects.filter(username = username).exists():
            return Response({"error":"user already exists"},status = 400)
      
      user = User.objects.create_user(username = username , password = password)
      return Response({"message":"user created successfullyyyyyyy"})
   

@api_view(["POST"])
def login(request):
      user = authenticate(
         username = request.data.get("username"),
         password = request.data.get("password")
      )
       
      if user:
            token,_ = Token.objects.get_or_create(user=user)
            return Response({"token":token.key})
         
      return Response({"error":"invalid credentials"},status=400)