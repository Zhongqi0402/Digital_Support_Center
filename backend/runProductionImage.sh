docker run --name 348-backend-production \
    -d --rm -p 50000:50000 \
    --env DB_NAME=348-project-production \
    xianchengz/348-backend
