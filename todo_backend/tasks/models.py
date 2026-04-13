from django.db import models
import uuid

# Create your models here.
class TaskModel(models.Model):

    internal_id =  models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    title=models.CharField(
        max_length=200,
        null=False,
        blank=False
    )

    description = models.TextField(
        max_length=400,
        blank=True,
        )

    completed = models.BooleanField(
        default=False
        )
    
    created_at = models.DateTimeField(
        auto_now_add=True
        )
    
    updated_at = models.DateTimeField(
        auto_now=True
        )
    
    def __str__(self):
        return self.title
    
    class Meta:
        db_table = 'tasks'
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'




