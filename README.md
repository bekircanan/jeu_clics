# Jeu_Clics - Click Game Project

## Overview

Jeu_Clics is a web-based click game project built using a combination of TypeScript, C#, HTML, and SCSS.  The project has a client-server architecture.

## Features

*   **Frontend:**  provides the user interface for the click game, built with HTML, SCSS, and TypeScript.
*   **Backend:**  handles game logic, data persistence, and potentially user authentication, built with C#.
*   **Database:** `click.sql` a SQL database is used for storing game data.

## Technologies Used

*   **Frontend:**
    *   TypeScript:  Main programming language for the frontend (46.2%).
    *   HTML: Used for structuring the web page (7.1%).
    *   SCSS:  Used for styling the web page (6.0%).
*   **Backend:**
    *   C#: Main programming language for the backend (40.7%).
*   **Database:**
    *   SQL: Database management system.

## Project Structure

The repository contains the following main directories:

*   `backend`: Contains the C# backend code.
*   `frontend`: Contains the TypeScript, HTML, and SCSS frontend code.
*   `click.sql`: Contains the SQL script for setting up the database.

## Setup Instructions (Example - Adapt as Necessary)

These are general instructions, you  need to adapt them based on the specific technologies and frameworks used within the project.

### Prerequisites

*   [.NET SDK](https://dotnet.microsoft.com/en-us/download) (for running the backend)
*   [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (for running the frontend)
*   A SQL database server (e.g., MySQL, PostgreSQL, SQL Server)

### Installation

1.  **Clone the repository:**

    ```
    git clone https://github.com/bekircanan/jeu_clics.git
    cd jeu_clics
    ```

2.  **Backend Setup:**

    *   Navigate to the `backend` directory.
    *   Restore the dependencies :
        ```
        dotnet restore
        ```
    *   Update the database connection string in the `appsettings.json` (or similar configuration file) to match your SQL database setup.
    *   Apply the database schema from `click.sql`.  For example, if using MySQL:

        ```
        mysql -u <your_user> -p <your_database> < click.sql
        ```

    *   Run the backend:

        ```
        dotnet run
        ```

3.  **Frontend Setup:**

    *   Navigate to the `frontend` directory.
    *   Install dependencies:

        ```
        npm install
        ```

    *   Configure the API endpoint in the frontend code to point to the running backend server (e.g., in a `config.js` or similar file).
    *   Start the frontend development server:

        ```
        npm start
        ```

## Usage

1.  Make sure both the backend and frontend are running.
2.  Open your web browser and navigate to the address where the frontend is running (usually `http://localhost:3000` or similar).
3.  Play the click game!

## Contact

Bekir Canan
