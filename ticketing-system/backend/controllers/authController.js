const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req,res) => {
    const { name, email, password } = req.body;

    console.log(name);
    console.log(email);
    console.log(password);

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(409).json({
            error:"User already exists."
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);

    const user = new User({
        name,
        email,
        passwordHash: hashedPassword
    });

    await user.save();

    res.status(201).json({
        message: "User registerd successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            error: "Invalid credentials."
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if(!isMatch){
        return res.status(401).json({
            error: "Invalid credentials."
        });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    res.json({
        message: "Login successful",
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};


const getMe = async (req,res) => {
    const user = await User.findById(req.user._id);

    if(!user){
        return res.status(404).json({
            error: "User not found."
        });
    }

    return res.status(200).json(req.user);
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};