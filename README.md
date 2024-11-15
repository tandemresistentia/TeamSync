# TeamSync

Enterprise workforce orchestration platform that streamlines team coordination, project tracking, and resource allocation through real-time analytics and intelligent planning.

## Features

- **Team Management**: Skills matrix, availability tracking, capacity planning
- **Resource Planning**: Drag-and-drop allocation, conflict detection, utilization forecasting
- **Project Tracking**: Timeline visualization, budget tracking, risk assessment
- **Analytics**: Real-time dashboards, performance metrics, resource utilization
- **Enterprise Security**: Role-based access control, JWT authentication

## Tech Stack

### Backend
- Spring Boot 3.2
- Spring Data JPA
- MapStruct
- Spring Security + JWT
- PostgreSQL

### Frontend
- Vue 3 + Vite
- TypeScript
- Tailwind CSS + shadcn-vue
- TanStack Query
- Pinia
- VeeValidate + Zod
- Axios

## Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- PostgreSQL 15+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/teamsync.git
cd teamsync
```

2. Backend setup:
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

3. Frontend setup:
```bash
cd frontend
npm install
npm run dev
```

4. Create `.env` files in both frontend and backend directories using provided templates.

### Environment Variables

Backend (`application.properties`):
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/teamsync
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_jwt_secret
```

Frontend (`.env`):
```env
VITE_API_URL=http://localhost:8080/api
```

## Development

### Backend Structure
```
src/
├── main/
│   ├── java/
│   │   └── com/teamsync/
│   │       ├── config/
│   │       ├── controller/
│   │       ├── dto/
│   │       ├── mapper/
│   │       ├── model/
│   │       ├── repository/
│   │       └── service/
│   └── resources/
```

### Frontend Structure
```
src/
├── components/
├── composables/
├── layouts/
├── pages/
├── stores/
├── types/
└── utils/
```

## License

MIT

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/teamsync
