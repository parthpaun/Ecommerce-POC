const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Address = require("../models/address");

module.exports.signUp = async (req, res) => {
  const {
    email,
    first_name,
    last_name,
    phone_number,
    password,
    addresses,
    role = "customer",
  } = req.body;

  try {
    // Check if a user with the same email or phone number already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone_number }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone number already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      phone_number,
      first_name,
      last_name,
      password: hashedPassword,
      role,
      active: true, // Set active to true by default for new users
      addressId: [],
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Create addresses and update the user with their references
    if (addresses && addresses.length > 0) {
      const addressIds = [];

      for (const address of addresses) {
        const newAddress = new Address({
          userId: savedUser._id,
          address_line1: address.address_line1,
          address_line2: address.address_line2,
          city: address.city,
          state: address.state,
          country: address.country,
          postal_code: address.postal_code,
          isDefault: address.isDefault || false,
        });

        // Save the address to the database
        const savedAddress = await newAddress.save();
        // Collect the address ID
        addressIds.push(savedAddress._id);
      }

      // Update the user's addressId field with the array of address ObjectIds
      savedUser.addressId = addressIds;
      await savedUser.save();
    }

    // Respond with success message and user data
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error registering user and addresses:", error);

    // If an error occurs during address creation, consider cleaning up the created user
    if (savedUser) {
      await User.findByIdAndDelete(savedUser._id);
    }

    res.status(500).json({ message: "Server error" });
  }
};

module.exports.signIn = async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await User.findOne({ email: id })?.select("-__v")?.populate({
      path: "addressId",
      select: "-__v",
    });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or phone number" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      "JWT",
      { expiresIn: "1h" } // Token expires in 1 hour (adjust as needed)
    );
    const { _id, email, role, first_name, last_name, phone_number } = user;
    res.status(200).json({
      token,
      data: { _id, email, role, first_name, last_name, phone_number },
    });
  } catch (error) {
    res.status(400).json({ message: "something went wrong", error });
  }
};
