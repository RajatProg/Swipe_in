# SwipeIn – AI Dining Intelligence Platform

SwipeIn is a full-stack dining management and analytics platform designed to improve campus dining operations using **real-time transaction tracking, inventory monitoring, and machine learning forecasting**.

The platform supports **three primary roles**:

- Students
- Employees
- Administrators

SwipeIn centralizes fragmented dining workflows into a single system, enabling operational transparency, analytics-driven decisions, and improved inventory planning.

This project was **presented at the North Texas Student Conference** as an AI-enabled operational analytics platform for dining services.

---

# Demo

Watch the project demo:

[![SwipeIn Demo](https://img.youtube.com/vi/H8zMV9jdtxM/0.jpg)](https://youtu.be/H8zMV9jdtxM)

The demo demonstrates:

- Student dining dashboard
- Meal swipe transaction tracking
- Admin financial analytics
- Inventory monitoring
- Role-based authentication
- Operational dashboards

---

# Problem Statement

Campus dining operations often rely on disconnected systems for:

- meal plan transactions
- inventory tracking
- menu management
- financial reporting

This leads to:

- poor demand forecasting
- inventory shortages or waste
- manual operational intervention
- limited real-time operational visibility

SwipeIn was designed to **centralize these operations into one intelligent platform**.

---

# Platform Roles

## Student Portal

Students can:

- View meal swipes and flex balance
- Track personal dining transaction history
- Browse dining locations and menus
- Monitor meal plan usage

---

## Dining Employee Portal

Employees can:

- Manage dining operations
- Monitor transactions
- Update inventory records
- Support daily dining workflows

---

## Admin Dashboard

Administrators can:

- Monitor financial transaction data
- Track inventory stock across locations
- Analyze operational metrics
- Access forecasting insights
- Manage menus and dining locations

The admin dashboard provides a **centralized operational analytics platform**.

---

# Machine Learning and Analytics

SwipeIn integrates machine learning and statistical analytics to support operational decision making.

## Demand Forecasting

Time-series forecasting models were built using:

- ARIMA
- LSTM Neural Networks

These models analyze historical dining transactions to forecast future demand and improve inventory planning.

---

## Statistical Analysis

Exploratory data analysis was conducted on:

- payment transactions
- meal usage
- inventory records

This analysis identifies:

- spending behavior
- peak dining hours
- demand patterns
- stock utilization trends

---

## AI Assistant

SwipeIn integrates a **vector-based LLM assistant** that enables administrators to retrieve operational insights using natural language queries.

The assistant helps administrators quickly retrieve information related to:

- dining operations
- inventory usage
- transaction trends

---

# Key Features

- Role-based authentication system
- Student dining dashboard
- Real-time meal swipe tracking
- Inventory monitoring and stock management
- Dining location and menu management
- Admin analytics dashboard
- Machine learning demand forecasting
- AI-powered operational assistant

---

# System Architecture

High-level workflow:

1. Users interact with student, employee, or admin interfaces
2. Backend APIs process transactions and operational requests
3. Operational data is collected and stored in database systems
4. ML pipelines analyze historical transaction data
5. Forecasting models generate demand predictions
6. Admin dashboards visualize analytics and operational insights
7. AI assistant retrieves knowledge via vector search

---

# Technology Stack

## Frontend

- React Native
- React
- TypeScript
- Expo

## Backend

- FastAPI
- Python
- REST APIs

## Machine Learning

- Pandas
- NumPy
- Scikit-learn
- TensorFlow
- ARIMA
- LSTM

## Data Processing

- Apache Kafka (event streaming)

## Cloud & Infrastructure

- AWS
- Docker
- Kubernetes (EKS)
- Terraform
- CI/CD pipelines

## Database

- SQL-based database (SQL Server)

---

