const dotenv=require('dotenv');
dotenv.config();
const express = require('express');
const cors=require('cors');
const app=express();
const cookieParser=require('cookie-parser');
const connectToDb=require('./db/db');
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes')

connectToDb();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/api/users',userRoutes);
app.use('/api/captains',captainRoutes);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});

module.exports = app;