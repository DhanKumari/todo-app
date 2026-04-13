# Base image for your container 
FROM python:3.10-slim

# Prevents .pyc files - Not needed in containers
ENV PYTHONDONTWRITEBYTECODE 1

# Shows logs immediately (no buffering)
ENV PYTHONUNBUFFERED 1


# Sets working directory inside container  eg: cd app
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project into Container 
COPY . .

# Run server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
