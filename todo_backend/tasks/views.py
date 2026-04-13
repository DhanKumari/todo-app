from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TaskSerializers
from .models import TaskModel
from .pagination import TaskPagination
# Create your views here

class TaskAPIView(APIView):
    
    def get(self, request):
        try:
            tasks= TaskModel.objects.all().order_by("-created_at")
            paginator= TaskPagination()

            pagination_query= paginator.paginate_queryset(tasks, request)
            serializer=TaskSerializers(pagination_query, many=True)
            response = paginator.get_paginated_response(serializer.data)

            response.data["message"] = "success"
            return response
        except Exception as e:
            return Response({"error":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request):
        serializers = TaskSerializers(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"message":"successfully created a Tasks"}, status=status.HTTP_201_CREATED)
        return Response({"error":serializers.errors}, status=status.HTTP_400_BAD_REQUEST)
        


class TaskDetailAPIView(APIView):

    def get_object(self, internal_id):
        try:
            return TaskModel.objects.get(internal_id=internal_id)
        except TaskModel.DoesNotExist:
            return None 
        
    def put(self, request, internal_id):
        task = self.get_object(internal_id)
        if not task:
            return Response({"message": "Task not found"},status=status.HTTP_404_NOT_FOUND)
        serializer = TaskSerializers(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"successfully updated the task "}, status=status.HTTP_200_OK)
        return Response({"error":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, internal_id):
        task=self.get_object(internal_id)
        if not task:
            return Response(
                {"message": "Task not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        try:
            task.delete()
            return Response(
                {"message": "Task deleted successfully"},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
            {"message": "Something went wrong", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

        
        


        