FROM python:3.12
LABEL maintainer="sagarsakharkar@gmail.com"

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libsasl2-dev \
    python-dev-is-python3 \
    libldap2-dev \
    libssl-dev 

# Set up the application directory
WORKDIR /app

# Copy the application code
COPY . /app

# Install application dependencies
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

EXPOSE 8001

COPY ./entrypoint.sh .
ENTRYPOINT ["sh", "/app/entrypoint.sh"]

