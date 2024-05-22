# Rentify Application

This is a backend application for a Renting system where users can see all the listed properties by a Seller. It provides functionalities for user authentication, Seller Management, and buying info.

## Features

- User sign up and login with email and password
- User can view the list of Properties
- User can see any particular property info
- Admin can manage Seller and properties
- Currently there is only one admin

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository:

   ```bash
   https://github.com/Nikhil-bit21/Rentify-api


# API Endpoints

## Authentication

### Sign Up
- `POST /user/signup`: Sign up a user

### Login
- `POST /user/login`: Login a user

## Property

### Get info All Property
- `GET /property/`: Get the All the properties

### Get info About a Property
- `GET /property/:id`: Get the specific property info

### Add Property
- `POST /property`: Add a new Property (Admin only)

### Update Property
- `PUT /property/:id`: Update a Property by ID (Admin only)

### Delete Candidate
- `DELETE /property/:id`: Delete a Property by ID (Admin only)

