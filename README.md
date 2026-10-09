# EventFlow – Event Management System

EventFlow is a web-based Event Management System developed using Laravel, React, TypeScript, and MySQL. It provides a user-friendly platform to create, manage, view, and organize events.

## Features

* User Registration and Login
* Secure Authentication
* Dashboard with Event Statistics
* Create, View, Update, and Delete Events
* Event Search and Filtering
* Pagination for Event Listings
* Event Image Upload and Display
* User Profile and Account Settings

## Technologies Used

* **Backend:** Laravel, PHP
* **Frontend:** React, TypeScript, Inertia.js
* **Database:** MySQL
* **Styling:** Tailwind CSS
* **Development Tools:** Visual Studio Code, Git, GitHub, Composer, npm

## Installation and Setup

### Prerequisites

* PHP
* Composer
* Node.js and npm
* MySQL
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/hashiniranasingha/EventFlow.git
cd EventFlow
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Copy `.env.example` to `.env` and configure your database settings.

```bash
php artisan key:generate
```

Create a MySQL database named `eventflow_db` and update the database credentials in `.env`.

### 5. Run Database Migrations

```bash
php artisan migrate
```

### 6. Start the Development Servers

Run the following commands in separate terminals.

```bash
php artisan serve
```

```bash
npm run dev
```

Open `http://127.0.0.1:8000` in your browser.

## Project Purpose

This project was developed to gain practical experience in full-stack web development, database integration, authentication, and CRUD operations using Laravel and React.


*EventFlow – Simplifying Event Management.*
