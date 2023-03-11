const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc Register a new user 
//@route Post api/users/register
//@access public 
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    // validate the user input data ,  
    if (!userName || !email || !password) {
        res.status(400).json("All fields are mandatory!");
        return;
    }
    // check if the user exists in db , 
    const user = await User.findOne({ email: email });
    //? we use email , cuz it's unique for each user 
    if (!user) {
        //hashing the user password 
        const hashedPassword = await bcrypt.hash(password, 12);

        //creating a new user 
        const newUser = await User.create(
            {
                userName,
                email,
                password: hashedPassword
            })

        res.status(201).json({ _id: newUser.id, email: newUser.email, userName: userName.userName });
        return;

    } else {
        res.status(400);
        res.json('the user is already exist ...');
        return;
    }
};



//@desc login user 
//@route Post api/users/login
//@access public
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('uncomplete data ...')
        return;
    }

    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                _id: user.id,
                email: user.email,   
                userName: user.userName
            }
        }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: "5m" })
        res.status(200).send(accessToken);
        return;
    } else {
        res.status(401).send('invalid data');
        return;
    }
};



//@desc current user data
//@route get users/api/current
//@access private
const currentUser = async (req, res) => {
    res.status(201).json(req.user);
}



//@desc delete all user in db 
//@route delete api/users/delete
//@access private 
const deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).send('all data deleted');
        return;
    } catch (err) {
        console.log(err);
    }   
}


//@desc isAuth 
//@route get api/users/isauth
//@access public
const isAuth = async (req, res) => {  
}


const getText= (req , res )=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('pls add text')
        console.log('inside ');
    }
    res.status(200).json('outside the if ')
}
module.exports = {getText , registerUser, loginUser, currentUser, deleteAllUsers }