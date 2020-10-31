const express = require('express');
const { connectDb } = require('./config/db')
const dotenv = require('dotenv');
const cors = require('cors')

const router = require('./route/router')

dotenv.config({ path: './config/config.env' })

// connecting db
// connectDb()

const app = express();

//to avoid cors policy violation
app.use(cors());

// body-parser into json
app.use(express.json())

app.use('/api/v1', router)

app.listen(process.env.PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
})
