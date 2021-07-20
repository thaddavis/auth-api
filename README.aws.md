
# 1

Store image into ecr

- aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 333427308013.dkr.ecr.us-east-1.amazonaws.com

- docker build -t auth-api .

- docker tag auth-api:latest 333427308013.dkr.ecr.us-east-1.amazonaws.com/auth-api:latest

- docker push 333427308013.dkr.ecr.us-east-1.amazonaws.com/auth-api:latest