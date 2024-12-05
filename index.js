//BASIC HOMEPAGE
// const express = require('express');

// const app = express();

// //routing in express
// app.get('/',(req, res) => {         //The / indicates the domain homepage
//     res.send("Hello, Express! what do you have for me today")
// })    
// app.listen(3000, ()=> {
//     console.log("app is listening on http://localhost:3000");
    
// })

const express = require('express');
const mongoose = require('mongoose')

const app = express();


app.use(express.json())

const port = 4000

const db = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/osfclass');
        console.log("database connection establish");
        
    } catch (error) {
      console.log('error connecting to database');
        
    }
}

db();


const schema =new mongoose.schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', schema)



app.post('/signup',async (req,res) => {
    try {
        const {userName,email,password} = req.body

        const existingUser = await User.findOne({email: email})

        if (existingUser){
            return res.status(400).json({message: "User already exist please login"})
        }

        const newUser = new User({
            userName: userName,
            email: email,
            password: password
        })

        await newUser.save()

        return res.status(200).json({message: "User created successfully"})
    } catch (error) {
        console.log(error);

        return res.status(500).json({message:"internal server error"})
        
    }
})


//routing in express
app.get('/', (reg,res) => {  //the / indicates the domain hompage
    res.send("Hello, Express")
}) 

app.listen(port, () => {
    console.log(`port is listening on http://localhost:${port}`);
    
})