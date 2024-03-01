import express from 'express';
import cors from 'cors'; 
import routes from './src/routes/employee-router';
import connectToDatabase from './src/database/connection';

// Created Express app
const app = express();

// Connected to MongoDB
connectToDatabase();

// Enabled CORS middleware
app.use(cors());

// Middleware to parse URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Defined routes
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
