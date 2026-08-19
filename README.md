# NovaCloud - Cloud Service Platform

A cloud service platform (VPS, Hosting, Domain) built with ASP.NET Core Web API and Next.js.

## Architecture

This project follows **Clean Architecture** with 4 layers:

- **Domain**: Core entities and business logic
- **Application**: DTOs, services, and use cases
- **Infrastructure**: Data access (Entity Framework Core) and external services
- **WebApi**: REST API controllers and configuration

### Design Patterns Applied

- **Repository Pattern**: Data access abstraction
- **Unit of Work Pattern**: Transaction management
- **Factory Pattern**: QR code generation

## Tech Stack

### Backend
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication
- AutoMapper

### Frontend
- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide Icons

## Project Structure

```
BaiTapPTPMHDT-main/
├── CloudService.Domain/          # Entities, interfaces
├── CloudService.Application/     # DTOs, services, business logic
├── CloudService.Infrastructure/  # EF Core, repositories
├── CloudService.WebApi/          # API controllers
├── CloudService.Frontend/        # Next.js application
└── Docs/                         # Project documentation
```

## Setup

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- SQL Server

### Backend Setup

```bash
cd CloudService.WebApi
dotnet restore
dotnet build
```

Configure connection string in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=NovaCloudDb;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

Run migrations:
```bash
dotnet ef database update
```

Run the API:
```bash
dotnet run
```

API will be available at `http://localhost:5154`

### Frontend Setup

```bash
cd CloudService.Frontend
npm install
```

Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5154
```

Run the development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

### Build for Production

```bash
# Frontend
npm run build
npm start

# Backend
dotnet build --configuration Release
dotnet run --configuration Release
```

## API Configuration

- **Base URL**: `http://localhost:5154`
- **Swagger**: `http://localhost:5154/swagger`

### Key Endpoints

- `POST /api/Auth/login` - User login
- `POST /api/Auth/register` - User registration
- `POST /api/Auth/refresh` - Refresh access token
- `GET /api/ServicePlans` - Get service plans
- `GET /api/NewsArticles` - Get news articles
- `GET /api/Orders/my-orders` - Get user orders (authenticated)
- `GET /api/Statistics/dashboard` - Get dashboard statistics (Admin)

## Database Setup

The project uses SQL Server. Ensure SQL Server is running and update the connection string in `appsettings.json`.

Run migrations to create the database schema:
```bash
cd CloudService.Infrastructure
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Roles

- **Admin**: Full access to all features
- **Editor**: Can manage news articles and orders
- **Customer**: Can view services, place orders, view own orders

## Build & Test

### Frontend
```bash
npm run lint
npx tsc --noEmit
npm run build
```

### Backend
```bash
dotnet build
dotnet test
```

## Demo Account

For demo purposes, use the login page's quick login buttons:
- **Admin**: Full administrative access
- **Editor**: Can manage news and orders
- **Customer**: Can browse and place orders

## Features

### Public Pages
- Landing page with hero banner
- Service plans and pricing
- News/blog with search and categories
- Contact form
- Affiliate information

### Admin Panel
- Dashboard with statistics and charts
- Service plan management
- User management
- Order management
- News article management
- Affiliate applications
- Audit logs
- Export orders to Excel

## License

This is a student project for the course "Phát triển phần mềm hướng đối tượng (IN4211)" at Trường Đại học Đồng Tháp.