#!/bin/bash

# --------- CLEANUP ---------
echo "Stopping and removing old containers..."
docker stop apphorizon-app apphorizon-mongodb-1 apphorizon-mongo-express-1 2>/dev/null
docker rm apphorizon-app apphorizon-mongodb-1 apphorizon-mongo-express-1 2>/dev/null

# --------- NETWORK ---------
echo "Creating network..."
docker network inspect apphorizon_default >/dev/null 2>&1 || \
  docker network create apphorizon_default

# --------- START MONGODB ---------
echo "Starting MongoDB..."
docker run -d \
  --name apphorizon-mongodb-1 \
  --network apphorizon_default \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo

# --------- START MONGO EXPRESS ---------
echo "Starting Mongo Express..."
docker run -d \
  --name apphorizon-mongo-express-1 \
  --network apphorizon_default \
  -p 8081:8081 \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
  -e ME_CONFIG_MONGODB_SERVER=apphorizon-mongodb-1 \
  mongo-express

# --------- START NODE APP ---------
echo "Starting AppHorizon Node app..."
docker run -d \
  --name apphorizon-app \
  --network apphorizon_default \
  -p 3000:3000 \
  apphorizon:1.0

echo "All containers started!"
echo "Node app: http://localhost:3000"
echo "Mongo Express: http://localhost:8081"

