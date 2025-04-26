# HACKER NEWS PAGE 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Installation

These instructions will guide you on how to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version >= 16 recommended): [https://nodejs.org/](https://nodejs.org/)
- **npm** (Node Package Manager - usually comes with Node.js) or **yarn**: [https://yarnpkg.com/](https://yarnpkg.com/)
- **MongoDB** (or your chosen database): [https://www.mongodb.com/](https://www.mongodb.com/)

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/sargisis/Hacker-News_SIte.git
    cd Hacker-News_SIte
    ```

2.  **Install backend dependencies:**

    cd backend
    npm install  # or yarn install
    cd ..
   

3.  **Install frontend dependencies:**

    
    cd frontend
    npm install  # or yarn install
    cd ..

5.  **Start the MongoDB server:**

    Ensure your MongoDB server is running.

6.  **Start the backend server:**

    cd backend
    npm run dev  # or yarn dev (if you have a dev script)
    # or npm start / yarn start (for production-like start)


7.  **Start the frontend development server:**

    cd frontend
    npm run dev  # or yarn dev (if you are using Vite)
    # or npm start / yarn start (if your frontend has a different setup)

## Usage

Once both the backend and frontend servers are running, you can access the application in your web browser at the frontend development server address (e.g., `http://localhost:5173`).

[Provide specific instructions on how to use the main features of your application. For example:]

- **Viewing News:** Navigate to the homepage to see the latest news articles.
- **Submitting Comments:** On each news article page, you can find a section to submit your comments. Fill in the required fields and click "Submit".
- **Asking Questions:** Go to the "Ask" page to post a new question. Enter your title and content, and click "Ask".
- **Answering Questions:** On the question pages, you can find a form to submit your answers.
- **User Registration and Login:** Use the "register" and "login" links in the navigation bar to create an account or log in to an existing one.

## Technologies Used

This project utilizes the following key technologies:

# BACKEND

# Node.js
# MongoDB
# Mongoose
# jsonwebtoken
# bcrypt
# cors

# FRONTEND
# React
# Vite
# axios
# Material UI

### Backend

- **Node.js:** JavaScript runtime environment for server-side development.
- **Express:** Minimalist and flexible Node.js web application framework.
- **MongoDB:** NoSQL database for storing application data.
- **Mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.
- **jsonwebtoken:** For creating and verifying JSON Web Tokens for authentication.
- **bcrypt:** For hashing passwords securely.
- **cors:** Middleware to enable Cross-Origin Resource Sharing.
- **[List any other backend libraries or frameworks used]**

### Frontend

- **React:** JavaScript library for building user interfaces.
- **Vite:** Next-generation frontend tooling that provides an extremely fast development experience.
- **axios:** Promise-based HTTP client for making API requests.
- **@mui/material:** Material Design UI library for React.
- **@mui/icons-material:** Material Design icons for React.
- **[List any other frontend libraries or frameworks used, e.g., Redux, Zustand, React Router]**

## Project Structure

├── backend/   
|   ├── authhorization/
|       ├── auth.js
│   ├── models/
│   │   ├── Answer.js
│   │   ├── Comments.js
│   │   ├── News.js
│   │   ├── Question.js
│   │   ├── User.js
│   │   └── Jobs.js
│   │   └── Posts.js
│   ├── routes/
│   │   ├── AskRouter.js
│   │   ├── FrontNewsRouter.js
│   │   ├── JobsRouter.js
│   │   ├── NewComment.js
│   │   └── NewsestRouter.js
│   │   └── NewsRouter.js
│   │   └── PostsRouter.js
│   │   └── ShowRouter.js
│   ├── middleware/
│   │   ├── authmiddleware.js
│   │   └── validator.js
│   ├── SECRET_KEY/
│   ├── prev.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── Api/
│   │   │   └── ApiService.js
│   │   ├── components/
│   │   │   ├── AddComment.jsx
│   │   │   ├── FrontNewsDisplay.jsx
│   │   │   ├── Comments.jsx
│   │   │   ├── CreateJob.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Front.jsx
│   │   │   ├── Job.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navigator.jsx
│   │   │   ├── NewComments.jsx
│   │   │   ├── News.jsx
│   │   │   ├── NewsDeatils.jsx
│   │   │   ├── Newsest.jsx
│   │   │   ├── Posts.jsx
│   │   │   ├── Register.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── App.css
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── .gitignore
├── README.md
├── vite.config.js
└── package-lock.json
