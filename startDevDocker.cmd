docker build . --tag front
docker run -p 127.0.0.1:4200:80/tcp front