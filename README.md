# Digital Portfolio Builder

A full-stack web platform that enables developers to create and showcase customizable digital portfolios.

## Tech Stack

- **Frontend:** React.js, Vite, Styled Components
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Containerization:** Docker, Docker Compose
- **Logging:** Winston Logger

## Features

- User authentication (JWT-based)
- Customizable portfolio templates with real-time theme adjustments
- RESTful APIs for portfolio, project, and user management
- Secure media upload and handling with Multer
- Structured logging for debugging and monitoring

## Project Structure

```
.
├── backend
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── server.js
│   │   └── services
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── public
│   ├── vite.config.js
└── README.md
```

## Installation

### Backend Setup

```sh
git clone <repository-url>
cd backend
cp .env.example .env
npm install
docker-compose up -d
npm start
```

### Frontend Setup

```sh
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| POST   | `/api/auth/register`    | Register a new user            |
| POST   | `/api/auth/login`       | Login user                      |
| GET    | `/api/portfolio`        | Get user portfolios             |
| POST   | `/api/portfolio`        | Create a new portfolio          |
| PUT    | `/api/portfolio/:id`    | Update a portfolio              |
| DELETE | `/api/portfolio/:id`    | Delete a portfolio              |

## Contribution Guidelines

Use conventional commit types:

- **feat:** for new features
- **fix:** for bug fixes
- **docs:** for documentation changes
- **style:** for formatting changes
- **refactor:** for code restructuring
- **test:** for adding tests
- **chore:** for maintenance tasks

## License

This project is licensed under the MIT License.


