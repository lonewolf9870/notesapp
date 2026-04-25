from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Note
from django.contrib.auth import authenticate
from .serializers import NoteSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
# Create your views here.
@api_view(["POST"])
def register(request):
      username = request.data.get("username")
      password = request.data.get("password")
       
      if User.objects.filter(username = username).exists():
            return Response({"error":"user already exists"},status = 400)
      
      user = User.objects.create_user(username = username , password = password)
      return Response({"message":"user created successfully"})
   

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

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def note_list_create(request):
   if request.method == "GET":
      notes = Note.objects.filter(user = request.user).order_by("-created_at")
      serializer = NoteSerializer(notes,many = True)
      return Response(serializer.data)
   
   if request.method == "POST":
      serializer = NoteSerializer(data = request.data)
      if serializer.is_valid():
         serializer.save(user = request.user)
         return Response(serializer.data,status = 201)
      return Response(serializer.errors,status = 400)

@api_view(["GET","DELETE","PUT"])
@permission_classes([IsAuthenticated])
def note_detail(request,id):
      try:
          note = Note.objects.get(id = id,user = request.user)
      except Note.DoesNotExist:
         return Response({"error":"note not found"},status = 404)
      
      if request.method == "GET":
         serializer = NoteSerializer(note)
         return Response(serializer.data)
      
      if request.method == "PUT":
         serializer = NoteSerializer(note,data = request.data)
         if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
         return Response(serializer.errors,status = 400)
      
      if request.method == "DELETE":
             note.delete()
             return Response({"message":"Note deleted successfully"},status = 200)
         

