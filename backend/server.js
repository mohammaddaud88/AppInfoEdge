const express = require('express')
const cors = require('cors')
require('dotenv').config();
const JDCreation = require('./controller/jdController')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// paths
app.use('/api/generate-jd',JDCreation)



// server configuration
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})