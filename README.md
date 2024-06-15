# BlinkID

BlinkID is a user-friendly platform designed for campus access regulation, verification, and real-time security alerts. It seamlessly integrates with existing systems, managing user profiles, sending SMS/email notifications, providing admin tools for access control, and ensuring cross-device compatibility. Additionally, it includes robust search functionality and supports real-time security alerts.

## Repository Information

- **Backend Code**: [blinkid-spring-bootapp-main](https://github.com/swamysmudiga/BlinkId-Spring-Bootapp)
- **Frontend Code**: [blink-id-react-admin-master](https://github.com/swamysmudiga/BlinId-React-Admin)
- **Face Recognition Service (Python, Flask API) Code**: [blinkid-flask-api-main](https://github.com/swamysmudiga/BlinkId-Flask-Api)
- **Mobile Application Code**: [BlinkID-Android-App](https://github.com/swamysmudiga/BlinkId-Android-App)

## Technology Stack

- **Backend**: Spring Boot, Java
- **Frontend (Admin Dashboard)**: React, JavaScript
- **Mobile Application**: Kotlin, Android
- **Facial Recognition**: Flask, Python
- **Database**: AWS RDS (PostgreSQL)
- **Deployment**: AWS Elastic Beanstalk, AWS EC2, Nginx, Gunicorn
- **Storage**: Firebase Storage
- **Notifications**: Firebase Notifications
- **CI/CD**: GitHub Actions
- **Monitoring**: AWS CloudWatch

## System Architecture

The system is composed of several key components:

1. **Spring Boot Application**: Manages user data and authentication logic.
2. **Facial Recognition Service**: A Flask API hosted on EC2 for processing facial recognition.
3. **Admin Dashboard**: A React application for managing users and viewing logs.
4. **Mobile Application**: An Android app for user interactions and authentication.
5. **CI/CD Pipeline**: Automated deployments using GitHub Actions.
6. **AWS Services**: Hosting, storage, and monitoring.

## Backend: Spring Boot Application

The backend service is responsible for user registration, authentication, and management. Key features include:

- RESTful API endpoints for user operations.
- Integration with AWS RDS for data persistence.
- Role-based access control using Spring Security.
- Deployment via AWS Elastic Beanstalk.

## AWS Integration

- **IAM**: Manages access permissions.
- **RDS (PostgreSQL)**: Database service for storing user data.
- **EBS**: Deployment of the Spring Boot application.
- **CloudWatch**: Monitoring and logging service.

## Facial Recognition Service

- **Flask API**: Handles image processing and facial recognition.
- **Hosted on EC2**: Ensures high availability and scalability.
- **Nginx and Gunicorn**: Used as a reverse proxy and WSGI HTTP server.

## Frontend: Admin Dashboard

- **React Application**: Interface for admin users to manage the system.
- **GitHub Pages**: Deployment platform for the static site.
- **Features**: User management, system logs, and performance metrics.

## Mobile Application

- **Developed in Kotlin**: Follows the MVVM pattern and clean architecture principles.
- **Features**: User registration, authentication via facial recognition, and push notifications.

## Continuous Integration and Deployment (CI/CD)

- **GitHub Actions**: Automates the build, test, and deployment process.
- **Pipelines**: Separate pipelines for backend, frontend, and mobile app.

## Security Considerations

- **Authentication**: JWT tokens for securing API endpoints.
- **Data Encryption**: SSL/TLS for data in transit, encryption at rest for sensitive data.
- **Access Control**: Fine-grained IAM policies and role-based access in the application.

For more details, please refer to the specific repositories linked above.
