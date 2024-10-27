# ft_transcendence

A web-based real-time multiplayer Pong game with social features. This project is the final challenge of the 42 school common core, designed to introduce students to modern web development technologies and practices.

## Overview

This project recreates the iconic Pong game with a modern twist, featuring:
- Real-time multiplayer gameplay
- User authentication via 42's OAuth system
- Chat system with public, private, and direct messaging
- User profiles with stats and match history
- Friend system with real-time status updates
- Two-factor authentication
- Responsive design

## Technologies

- **Frontend**: React + TypeScript + Vite
- **Backend**: NestJS
- **Database**: PostgreSQL
- **Real-time Communication**: Socket.io
- **Container**: Docker
- **Authentication**: OAuth 2.0 (42 intranet)

## Features

### User Authentication & Security
- 42 OAuth integration
- Two-factor authentication option
- Secure password hashing
- Protected routes
- Input validation
- SQL injection protection

### Game Features
- Real-time multiplayer Pong
- Matchmaking system
- Custom game rooms
- Multiple game themes
- Spectator mode
- Game stats tracking

### Social Features
- User profiles with avatars
- Friend system
- Real-time user status
- Match history
- Player rankings

### Chat System
- Public channels
- Private channels with password protection
- Direct messaging
- User moderation (admin rights, ban/mute functionality)
- Message blocking

## Learning Objectives

This project serves as an introduction to:
1. Modern web development with TypeScript
2. Backend development using NestJS
3. Real-time web applications
4. User authentication and security
5. Database management
6. Docker containerization
7. WebSocket communication
8. Frontend state management (Redux)
9. Responsive UI design

## Prerequisites

- Node.js
- Docker and Docker Compose
- 42 API credentials (for OAuth)

## Installation

1. Clone the repository

2. Create environment file
```bash
sh scripts/create-env.sh
```
You'll need to provide your 42 API credentials during this step.

3. Build and run with Docker
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:4040
- Backend: http://localhost:8080
- Database: http://localhost:6060

## Project Structure

```
ft_transcendence/
├── backend/           # NestJS backend
├── frontend/         # React frontend
├── docs/            # Documentation
├── scripts/         # Utility scripts
└── docker-compose.yml
```

## Development Tools

- ESLint for code linting
- Prettier for code formatting
- TypeORM for database management
- Socket.io for real-time communications
- Redux for state management

## Team

Special thanks to the team who contributed to this project:
- [RobinBurri](https://github.com/RobinBurri)
- [t-h2o](https://github.com/t-h2o)
- [shaolin-peanut](https://github.com/shaolin-peanut)
- [fire-poy](https://github.com/fire-poy)
- [eprei](https://github.com/eprei)

## Project Status

This project was developed as part of the 42 school curriculum. While it meets all the requirements of the assignment, there's always room for improvement and new features.
