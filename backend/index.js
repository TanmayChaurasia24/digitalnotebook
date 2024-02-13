const connectToMongo = require('./db');
const express = require('express');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const cors = require('cors')

const app = express();
const port = 5000;

// connect to mongo DB
connectToMongo();
app.use(cors())
// using middleware 
app.use(express.json());

// Use the authRoutes for handling requests to /api/auth
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
