import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const {fullname, email, password} = req.body;
    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        if (password.length < 4) {
            return res.status(400).json({ message: "Password must be greater than 4 characters!" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format!" });
        }
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({ message: "Email already exists!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname, email, password: hashedPassword
        });
        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            });
            // TODO: send a welcome email to user 
        } else {    
            res.status(400).json({ message: "Invalid user credentials!" });
        }
    } catch (error) {
        console.log("Error in signup...", error.message);
        res.status(500).json({ message: "Internal server error!" });
    }
}