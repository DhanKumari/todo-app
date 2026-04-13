
from django.urls import path , include
from .views import TaskAPIView, TaskDetailAPIView


urlpatterns = [
    path("task/",TaskAPIView.as_view(), name="tasks"),
    path("task/<uuid:internal_id>/",TaskDetailAPIView.as_view(), name="task-update" )

]
