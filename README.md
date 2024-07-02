# SSG Employee

1. **Frontend**: React App provides a user interface for CRUD (Create, Read, Update, Delete) operations on employee records. It interacts with the API Gateway through GraphQL.
2. **API Gateway**: Use NodeJS, Grpc server. Acts as an intermediary between the Frontend and the Management Microservice.
3. **Management Service**: Nodejs, Grpc client. Contains all the business logic and manages the state of employee records.

## Repository Structure

Monorepo organized into three separate folders, each corresponding to one of the services:

1. **frontend**: Contains the code for the frontend service.
2. **api-gateway**: Contains the code for the API Gateway microservice.
3. **management-microservice**: Contains the code for the Management microservice.

## Development Setup

Use Docker to build project:

1. **Clone the repository**:

```bash
git clone https://github.com/hungndSavvycom/ssg-test.git
cd ssg-test
```

2. **Run the development build using Docker Compose**:

```bash
docker-compose up -d --build
```

Docker compose include: **frontend**, **api-gateway**, **management-microservice**, **postgres**

### URLs for Dev mode

1. **API Gateway**:Including Apollo Studio at <http://localhost:4000/>
2. **Frontend**: <http://localhost:5173/>

## Production Deployment

For production deployment, we use AWS EC2 instances. The services will be accessible via the following URLs:

### URLs for Production

1. **API Gateway**: <http://13.251.132.216:4100/>
2. **Frontend**: <http://13.251.132.216:4175/>

## Testing

### Unit Tests

Unit tests are included for the Frontend service. To run the tests, navigate to the **frontend** folder and use the following command:

```bash
npm run test
```
