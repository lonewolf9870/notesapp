from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Note
from ..serializers.note_serializer import NoteSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.pagination import PageNumberPagination

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def note_list_create(request):
   if request.method == "GET":
      notes = Note.objects.filter(user = request.user).order_by("-created_at")
      
      paginator = PageNumberPagination()
      paginated_notes = paginator.paginate_queryset(notes,request)
      
      serializer = NoteSerializer(paginated_notes,many = True)
      return paginator.get_paginated_response(serializer.data)
   
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
         

