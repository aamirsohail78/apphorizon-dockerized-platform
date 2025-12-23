# AppHorizon - Dockerized Demo App

A simple user profile application using Node.js, Express, MongoDB, and Docker. All components are containerized for easy deployment.

---

## Features
- Frontend: `index.html` with pure JS & CSS
- Backend: Node.js + Express
- Database: MongoDB
- Supports Docker and Docker Compose setups

---

## Running the App

### Using Docker
1. **Create network (optional):**  
```bash
docker network create mongo-network
# AppHorizon - Dockerized Demo App

A simple user profile application using Node.js, Express, MongoDB, and Docker. All components are containerized for easy deployment.

---

## Features
- Frontend: `index.html` with pure JS & CSS
- Backend: Node.js + Express
- Database: MongoDB
- Supports Docker and Docker Compose setups

---

## Running the App

### Using Docker
1. **Create network (optional):**  
```bash
docker network create mongo-network

2.Start MongoDB:

docker run -d -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  --name mongodb --net mongo-network mongo
3.Start Mongo Express:

docker run -d -p 8081:8081 \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
  -e ME_CONFIG_MONGODB_SERVER=mongodb \
  --name mongo-express --net mongo-network mongo-express
4.Open Mongo Express: http://localhost:8081
 and create database user-account with collection users.
5.Start Node.js backend:

cd apphorizon/app
npm install
node server.js
6.Access app: http://localhost:3000

Using Docker Compose
docker-compose -f docker-compose.yaml up


Mongo Express: http://localhost:8080

Create database apphorizon-db and collection users

Start Node.js as above
7.Build Docker Image
docker build -t my-app:1.0 .
