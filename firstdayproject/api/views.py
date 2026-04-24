from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer
# Create your views here.
@api_view(["GET","POST"])
def note_list_create(request):
   if request.method == "GET":
      notes = Note.objects.all().order_by("-created_at")
      serializer = NoteSerializer(notes,many = True)
      return Response(serializer.data)
   
   if request.method == "POST":
      serializer = NoteSerializer(data = request.data)
      if serializer.is_valid():
         serializer.save()
         return Response(serializer.data,status = 201)
      return Response(serializer.errors,status = 400)

@api_view(["GET","DELETE","PUT"])
def note_detail(request,id):
      try:
          note = Note.objects.get(id = id)
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
         

