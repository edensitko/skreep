# Docker Setup for Skreep Project

This document provides instructions for running the Skreep Next.js application using Docker.

## 📁 Docker Files Overview

- **`Dockerfile`** - Production-optimized multi-stage build
- **`Dockerfile.dev`** - Development environment with hot reloading
- **`docker-compose.yml`** - Orchestration for both production and development
- **`.dockerignore`** - Excludes unnecessary files from Docker context

## 🚀 Quick Start

### Production Build

```bash
# Build and run production container
docker-compose up --build skreep-app

# Or run in detached mode
docker-compose up -d --build skreep-app
```

### Development Build

```bash
# Run development container with hot reloading
docker-compose --profile dev up --build skreep-dev
```

## 🛠 Manual Docker Commands

### Production

```bash
# Build production image
docker build -t skreep-app .

# Run production container
docker run -p 3000:3000 --name skreep-production skreep-app

# Run with environment variables
docker run -p 3000:3000 -e NODE_ENV=production --name skreep-production skreep-app
```

### Development

```bash
# Build development image
docker build -f Dockerfile.dev -t skreep-dev .

# Run development container with volume mounting
docker run -p 3001:3000 -v $(pwd):/app -v /app/node_modules --name skreep-development skreep-dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Example environment variables
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
# Add your custom environment variables here
```

### Docker Compose Override

Create a `docker-compose.override.yml` for local customizations:

```yaml
version: '3.8'
services:
  skreep-app:
    ports:
      - "8080:3000"  # Custom port mapping
    environment:
      - CUSTOM_VAR=value
```

## 📊 Health Monitoring

The application includes a health check endpoint at `/api/health` that provides:

- Application status
- Uptime information
- Environment details
- Timestamp

Access it at: `http://localhost:3000/api/health`

## 🐳 Docker Best Practices Applied

### Multi-stage Build
- **deps**: Install production dependencies only
- **builder**: Build the application
- **runner**: Minimal runtime image

### Security
- Non-root user (`nextjs:nodejs`)
- Minimal Alpine Linux base image
- No unnecessary packages

### Performance
- Standalone output for smaller images
- Layer caching optimization
- .dockerignore for faster builds

### Monitoring
- Health check endpoint
- Container restart policies
- Resource limits (can be added)

## 📋 Common Commands

```bash
# View running containers
docker ps

# View logs
docker-compose logs skreep-app

# Stop containers
docker-compose down

# Remove containers and images
docker-compose down --rmi all

# Build without cache
docker-compose build --no-cache

# Scale containers (if needed)
docker-compose up --scale skreep-app=3
```

## 🔍 Troubleshooting

### Build Issues
```bash
# Clean Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache --pull
```

### Permission Issues
```bash
# Fix file permissions (if needed)
sudo chown -R $USER:$USER .
```

### Port Conflicts
```bash
# Check what's using port 3000
lsof -i :3000

# Use different port in docker-compose.yml
ports:
  - "3001:3000"
```

## 🚀 Deployment

### Production Deployment

1. **Build the image:**
   ```bash
   docker build -t skreep-app:latest .
   ```

2. **Tag for registry:**
   ```bash
   docker tag skreep-app:latest your-registry/skreep-app:latest
   ```

3. **Push to registry:**
   ```bash
   docker push your-registry/skreep-app:latest
   ```

4. **Deploy on server:**
   ```bash
   docker run -d -p 80:3000 --name skreep-production your-registry/skreep-app:latest
   ```

### Using Docker Swarm or Kubernetes

The application is ready for orchestration platforms. The health check endpoint and proper signal handling make it suitable for:

- Docker Swarm
- Kubernetes
- AWS ECS
- Google Cloud Run
- Azure Container Instances

## 📈 Performance Tips

1. **Use .dockerignore** - Already configured to exclude unnecessary files
2. **Multi-stage builds** - Reduces final image size
3. **Layer caching** - Order Dockerfile commands for optimal caching
4. **Standalone output** - Next.js optimization for containers

## 🔐 Security Considerations

- Non-root user execution
- Minimal base image (Alpine Linux)
- No sensitive data in images
- Regular security updates
- Health check monitoring

---

For more information about the Skreep project, see the main README.md file.
