const User = require("../collections/User");
const { hashPassword, verifyPassword, createSession, } = require("../config/authentication");

// Register a user
exports.registerUser = async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create a new user
        const newUser = new User(req.body);
        newUser.password = await hashPassword(req.body.password);
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        // Check if the email exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Check if the password is correct
        const isPasswordValid = await verifyPassword(
            req.body.password,
            existingUser.password
        );
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Generate a JWT token and send it in the response
        const token = await createSession(existingUser._id.toString());
        console.log(token);
        res.status(200).json({ token , user: existingUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};