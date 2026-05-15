# PC Builder Backend

Backend API for the PC Builder application built with Node.js, Express, and JWT authentication.

## Features

- **Authentication**: JWT-based login and signup system
- **Component Management**: CRUD operations for PC components
- **Build Generation**: Automatic PC build generation based on budget and use case
- **CORS Support**: Cross-origin requests enabled for frontend integration

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
  - Body: `{ "email": "user@example.com", "password": "password123" }`
- `POST /api/auth/login` - User login
  - Body: `{ "email": "user@example.com", "password": "password123" }`
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Components
- `GET /api/components` - Get all components
- `GET /api/components/:type` - Get components by type (cpu, gpu, ram, storage, motherboard, psu, case)
- `GET /api/components/component/:id` - Get component by ID

### Build Generation
- `POST /api/build/generate` - Generate PC build
  - Body: `{ "budget": number, "type": "gaming" | "office" }`

### Health Check
- `GET /api/health` - Server health status

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Docker

Build and start the backend container locally:
```bash
docker build -t pc-builder-backend .
docker run -p 5000:5000 --env JWT_SECRET=super-secret pc-builder-backend
```

If you use the repository root `docker-compose.yml`, start both frontend and backend with:
```bash
docker compose up --build
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## Default Test User

Email: `admin@pcbuilder.com`
Password: `admin123`

The server will run on `http://localhost:5000`

## Sample Data

The backend includes sample PC components data including:
- CPUs (Intel and AMD)
- GPUs (NVIDIA and AMD)
- RAM (DDR4 and DDR5)
- Storage (SSD and HDD)
- Motherboards
- Power Supplies
- Cases

## Authentication

Default login credentials:
- Email: `admin@pcbuilder.com`
- Password: `admin123`

## Build Generation Logic

The build generation prioritizes components based on the build type:
- **Gaming**: GPU > CPU > RAM > Storage > Motherboard > PSU > Case
- **Office**: CPU > RAM > Storage > Motherboard > GPU > PSU > Case

Components are selected starting from the cheapest options that fit within the budget.