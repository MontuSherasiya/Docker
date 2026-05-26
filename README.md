# 🐳 Full-Stack App with Docker

A full-stack web application with a **React (Vite)** frontend and **Express.js** backend, containerized using Docker and orchestrated with Docker Compose.

---

## 📁 Project Structure

```
Docker/
├── client/                  # React (Vite) frontend
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── server/                  # Express.js backend
│   ├── Dockerfile
│   ├── package.json
│   └── index.js (or app.js)
├── docker-compose.yml       # Docker Compose config
└── .gitignore
```

---

## 🛠️ Prerequisites

Make sure you have the following installed on your machine:

| Tool | Version | Download |
|------|---------|----------|
| Docker | 20.x or higher | https://docs.docker.com/get-docker/ |
| Docker Compose | v2.x or higher | Included with Docker Desktop |
| Git | Any | https://git-scm.com/ |
| Node.js *(optional, for local dev)* | 18.x+ | https://nodejs.org/ |

### Check installed versions:
```bash
docker --version
docker compose version
git --version
node --version     # optional
npm --version      # optional
```

---

## 🚀 Getting Started (Step by Step)

### Step 1 — Clone the Repository

```bash
git clone https://github.com/MontuSherasiya/Docker.git
cd Docker
```

---

### Step 2 — Understand the docker-compose.yml

The `docker-compose.yml` defines two services connected via a shared bridge network:

```yaml
version: "3.9"

services:
  server:
    build: ./server
    container_name: express-server
    ports:
      - "4000:4000"
    networks:
      - fullstack-net
    restart: unless-stopped

  client:
    build: ./client
    container_name: react-client
    ports:
      - "5173:3000"
    networks:
      - fullstack-net
    depends_on:
      - server
    restart: unless-stopped

networks:
  fullstack-net:
    driver: bridge
```

| Service | Container Name | Host Port | Container Port |
|---------|---------------|-----------|----------------|
| Express Server | `express-server` | `4000` | `4000` |
| React Client | `react-client` | `5173` | `3000` |

---

### Step 3 — Build the Docker Images

Build both the client and server images from their respective Dockerfiles:

```bash
docker compose build
```

To build without using cache (fresh build):
```bash
docker compose build --no-cache
```

To build a specific service only:
```bash
docker compose build server
docker compose build client
```

---

### Step 4 — Run the Application

Start all containers in **detached mode** (background):
```bash
docker compose up -d
```

Start with **logs visible** in the terminal:
```bash
docker compose up
```

Start and rebuild images at the same time:
```bash
docker compose up --build -d
```

---

### Step 5 — Access the Application

Once containers are running, open your browser:

| Service | URL |
|---------|-----|
| React Frontend | http://localhost:5173 |
| Express Backend (API) | http://localhost:4000 |

---

### Step 6 — View Logs

View logs from all running containers:
```bash
docker compose logs
```

Follow logs in real-time (live tail):
```bash
docker compose logs -f
```

View logs for a specific service:
```bash
docker compose logs server
docker compose logs client
```

Follow logs for a specific service:
```bash
docker compose logs -f server
docker compose logs -f client
```

---

### Step 7 — Stop the Application

Stop all running containers (keeps containers and images):
```bash
docker compose stop
```

Stop and **remove** containers (keeps images and volumes):
```bash
docker compose down
```

Stop, remove containers, **and remove images**:
```bash
docker compose down --rmi all
```

Stop and remove containers **and volumes**:
```bash
docker compose down -v
```

---

## 🔧 Useful Docker Commands

### Container Management

```bash
# List all running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Inspect a specific container
docker inspect express-server
docker inspect react-client

# Restart a specific service
docker compose restart server
docker compose restart client
```

### Shell Access (Exec into Container)

```bash
# Open a shell inside the server container
docker exec -it express-server sh

# Open a shell inside the client container
docker exec -it react-client sh

# Run a single command inside a container
docker exec -it express-server node --version
```

### Image Management

```bash
# List all Docker images
docker images

# Remove a specific image
docker rmi <image-id>

# Remove all unused images
docker image prune

# Remove all stopped containers, unused networks, dangling images
docker system prune
```

### Network Management

```bash
# List all Docker networks
docker network ls

# Inspect the fullstack network
docker network inspect docker_fullstack-net
```

---

## 🔄 Development Workflow

### Rebuild after code changes:

```bash
# Rebuild and restart everything
docker compose up --build -d

# Rebuild only the server
docker compose up --build server -d

# Rebuild only the client
docker compose up --build client -d
```

### Check container health:

```bash
docker compose ps
```

---

## 🧹 Complete Cleanup (Reset Everything)

To completely clean up all Docker resources for this project:

```bash
# Stop and remove containers, networks, and images
docker compose down --rmi all -v

# Optionally prune unused system resources
docker system prune -a
```

> ⚠️ **Warning:** `docker system prune -a` removes ALL unused images system-wide, not just for this project.

---

## 🏗️ Project Architecture

```
Browser
   │
   ▼
React Client (Port 5173)
   │
   │  HTTP Requests (API calls)
   ▼
Express Server (Port 4000)
   │
   └─── Both on: fullstack-net (Docker bridge network)
```

- The **React client** is served on port `5173` (Vite's default).
- The **Express server** listens on port `4000`.
- Both containers communicate over the `fullstack-net` bridge network.
- The client **depends on** the server — Docker starts the server first.
- Both containers restart automatically unless manually stopped (`restart: unless-stopped`).

---

## ❓ Troubleshooting

### Port already in use:
```bash
# Find what's using port 4000 or 5173
lsof -i :4000
lsof -i :5173

# Kill the process or change the port mapping in docker-compose.yml
```

### Container not starting:
```bash
# Check logs for errors
docker compose logs server
docker compose logs client
```

### Image build fails:
```bash
# Build with full output to see the error
docker compose build --progress=plain
```

### Cannot connect to Docker daemon:
```bash
# Make sure Docker Desktop is running, or on Linux start the service
sudo systemctl start docker
```

---

## 📄 License

This project is open source. See the repository for details.

---

## 👤 Author

**Montu Sherasiya**
GitHub: [@MontuSherasiya](https://github.com/MontuSherasiya)