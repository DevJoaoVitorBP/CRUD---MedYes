
# MedYes

MedYes is an application for managing doctors, patients, secretaries, and appointments. The project consists of a backend and a frontend, each with its own functionalities and screens.

## Backend

The backend of MedYes is built based on the Clean Architecture, divided into several main parts:

### Project Structure

- **Adapter**: Contains the repositories responsible for data persistence.
- **Domains**: Contains the application domains, business entities, and business rules.
- **Framework**: Contains the `server.js` file, responsible for starting the server and configuring the application routes.
- **Use_cases**: Contains the application use cases, which orchestrate the data flow between the user, entities, and the database.
- **Main.js**: Entry point of the application, initializes all necessary dependencies and starts the server.

### How to Start the Backend

To start the MedYes backend, follow these steps:

1. Make sure you have Node.js and npm installed on your system.

2. Clone this repository.

   ```
   git clone https://github.com/your-username/medyes-backend.git
   ```

3. Navigate to the project directory.

   ```
   cd medyes-backend
   ```

4. Install the dependencies.

   ```
   npm install
   ```

5. Start the server.

   ```
   npm start
   ```

The server will be started and ready to receive requests.

## Frontend

The frontend of MedYes is built with Vue.js, a progressive JavaScript framework for building user interfaces.

### Screens

- **Doctor Screen**: Allows creating and deleting doctor records.
- **Secretary Screen**: Allows creating and deleting secretary records.
- **Patient Screen**: Allows creating and deleting patient records.
- **Appointments Screen**: Allows creating, updating, and deleting appointment records.

### Access Control (ACL) Feature

The upcoming feature to be implemented in the frontend is Access Control (ACL), which will enforce user permissions and restrict access to specific screens and functionalities based on user roles.

### Starting the Frontend

To start the MedYes frontend, follow these steps:

1. Make sure you have Node.js and npm installed on your system.

2. Clone this repository.

   ```
   git clone https://github.com/DevJoaoVitorBP/CRUD---MedYes
   ```

3. Navigate to the project directory.

   ```
   cd frontend
   ```

4. Install the dependencies.

   ```
   npm install
   ```

5. Start the development server.

   ```
   npm run serve
   ```

The development server will be started, and you can access the MedYes frontend in your browser.
