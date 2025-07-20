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
        res.status(200).json({ token , user: existingUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { body } = req;

  try {
    // Check if the request body is empty
    if (!body) {
      return res.status(400).json({ error: "Request body is empty" });
    }

    const user = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    // Check for specific validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};