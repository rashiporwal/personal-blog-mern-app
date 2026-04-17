const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const postRoutes = require('./routes/postRoutes');

const authRoutes = require('./routes/authRoutes');

// const connectDB = require('./config/db')

const app = express();


const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: (origin,callback) => {
        if (whitelist.indexOf(origin) !== -1 || origin){
            callback(null,true)
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(express.json());



const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('Server is running..')
});

app.use('/api/posts',postRoutes);

app.use('/api/auth',authRoutes);

const startServer = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB!');
        console.log("Connecting to:", process.env.MONGO_URI);

        
        app.listen(PORT , ()=>{
            console.log(`server is running on port ${PORT} `);
            
        });
    }
    catch(error){
        console.error('Failed to connect to MongoDB',error);
        process.exit(1);
        
    }
}

startServer();
