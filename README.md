# REST API Weather Explorer

## Introduction

REST APIs (Representational State Transfer APIs) allow applications to communicate with servers using HTTP requests.

This project demonstrates how a web application can use a real-world REST API to retrieve weather information and display it to users.

The application uses the Open-Meteo API to retrieve weather data.

## Project Features

- Search for a city
- Send GET requests to REST APIs
- Retrieve JSON responses
- Display temperature
- Display humidity
- Display wind speed
- Display current time
- Handle invalid city names
- Handle API errors
- Simple and user-friendly interface

## How REST APIs Work

The basic communication process is:

```text
Web Application
      |
      | GET Request
      v
REST API
      |
      | JSON Response
      v
Web Application
      |
      v
Display Data
