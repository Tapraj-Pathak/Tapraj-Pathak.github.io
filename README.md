# Tapraj Pathak

A modern personal portfolio website for Tapraj Pathak, built with React and Vite on the client side and an Express-based API on the server side. The site includes an interactive terminal-inspired hero section, project highlights, social links, and a working contact form.

## Overview

This repository contains:

- A frontend portfolio site in the client folder
- A backend contact API in the server folder
- A responsive, animated UI with theme switching and command-palette navigation

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- Nodemailer
- Cloudinary
- Helmet, CORS, and rate limiting

## Project Structure

```text
client/         # Vite + React frontend
server/         # Express API backend
```

## Features

- Interactive terminal-style homepage experience
- Smooth scrolling and animated sections
- Dark/light theme toggle
- Command palette navigation
- Contact form that sends messages through the backend API

## Prerequisites

Make sure you have the following installed:

- Node.js 18 or newer
- npm or pnpm

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Tapraj-Pathak/Tapraj-Pathak.github.io.git
cd Tapraj-Pathak.github.io
```

### 2. Install dependencies

Install the frontend dependencies:

```bash
cd client
npm install
```

Install the backend dependencies:

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create a .env file in the server folder and add the required values:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string
PRIMARY_EMAIL=your_primary_email
SECONDARY_EMAIL=your_secondary_email

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the app locally

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd client
npm run dev
```

Then open the local frontend URL shown by Vite, usually http://localhost:5173.

## Available Scripts

### Client

- npm run dev — start the Vite development server
- npm run build — build the app for production
- npm run preview — preview the production build

### Server

- npm run dev — start the server with watch mode
- npm run start — start the server normally

## Deployment Notes

### Recommended production setup

- Host the frontend on Vercel or Netlify
- Host the backend API on Render
- Use a custom domain such as tapraj.me

### Production environment variables

Set these in your hosting provider for the backend:

```env
NODE_ENV=production
PORT=10000
CLIENT_URL=https://tapraj.me
ALLOWED_ORIGINS=https://tapraj.me
MONGODB_URI=your_mongodb_connection_string
PRIMARY_EMAIL=your_primary_email
SECONDARY_EMAIL=your_secondary_email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ALLOW_VISITOR_FROM=false
```

### Frontend API URL

In the frontend deployment environment, set:

```env
VITE_API_URL=https://your-api-domain.onrender.com/api
```

### Custom domain

1. Point your .me domain to your hosting provider's DNS settings.
2. Add the domain in Vercel or Netlify.
3. Add the same domain as the frontend URL in your backend environment variables.
4. If you use Render, set the backend URL and then update the frontend API variable.

## License

No license has been specified for this project yet.
