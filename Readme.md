# Store Rating Application

## Project Description

The Store Rating Application is a full-stack web application designed to allow users to rate and review stores. It features a single login system that provides different functionalities based on the user's role: System Administrator, Store Owner, or Normal User.

## Tech Stack

* **Frontend**: React.js
* **Backend**: Express.js
* **Database**: MySQL

## Key Features

The application's functionalities are divided based on the user's role, as specified in the project requirements.

### General Functionalities

* **Single Login System**: All users log in through a single, secure system.
* **Rating System**: Users can submit ratings for stores on a scale of 1 to 5.
* **Password Updates**: Users can securely update their password after logging in.
* **Form Validations**: All forms adhere to specific validation rules for data integrity.

### System Administrator

* **Dashboard**: Access to a dashboard displaying key metrics: total users, total stores, and total submitted ratings.
* **User Management**: Can add new System Administrators, Normal Users, and Store Owners.
* **Store Management**: Can add new stores to the platform.
* **Data Views**:
    * View a list of all stores (Name, Email, Address, Rating).
    * View a list of all normal and admin users (Name, Email, Address, Role).
* **Search, Filter, and Sort**: Can apply filters and sorting (ascending/descending) on all listings based on criteria like Name, Email, Address, and Role.
* **Store Owner Details**: Can view a Store Owner's average rating on their user details page.

### Normal User

* **Registration**: Can sign up for the platform.
* **Store Listings**: Can view a list of all registered stores with their Name, Address, Overall Rating, and the user's own submitted rating.
* **Search**: Can search for stores by Name and Address.
* **Rating Submission**: Can submit a rating (1-5) for a store and modify their rating at any time.

### Store Owner

* **Dashboard**: Access to a dashboard showing:
    * A list of users who have submitted ratings for their store.
    * The average rating of their store.

## Setup and Installation

Follow these steps to get a local copy of the project up and running.

### Prerequisites

* [Node.js](https://nodejs.org/) (version 14 or higher)
* [MySQL](https://www.mysql.com/)

### Backend Setup

1.  **Clone the repository**:
    ```
    git clone [https://github.com/Parihar-Dev/Store-Rating-Application.git](https://github.com/Parihar-Dev/Store-Rating-Application.git)
    cd Store-Rating-Application
    ```
2.  **Install dependencies**:
    ```
    cd Backend
    npm install
    ```
3.  **Configure environment variables**:
    Create a `.env` file in the `backend` directory with your MySQL database credentials.
    ```
    DB_HOST=localhost
    DB_USER=your_user
    DB_PASSWORD=your_password
    DB_NAME=your_database_name
    PORT = your_desired_port
    JWT_SECRET = jwt_secret
    ```
4.  **Initialise data with seed.js**
    ```
    node seed.js
    ```
5.  **Start the backend server**:
    ```
    npm start
    ```

### Frontend Setup

1.  **Navigate to the frontend directory**:
    ```
    cd ../Frontend
    ```
2.  **Install dependencies**:
    ```
    npm install
    ```
3.  **Start the frontend development server**:
    ```
    npm start
    ```
