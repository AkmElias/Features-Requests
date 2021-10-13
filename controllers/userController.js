import generateToken from "../utils/generateToken.js";
import { errorHandler } from "../middilewares/errorMiddileware.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({user: {
      _id: user._id,
      userName: user.userName,
      role: user.role,
      profilePicture: user.profilePicture,
      token: generateToken(user._id, user.role),
    }
    });
  } else {
    res.status(401).json("Invalid email or password!");
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.role === "admin" && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        userName: user.userName,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res
        .status(401)
        .json(
          "Invalid email or password/ No admin with these cardential present"
        );
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, role, password } = req.body;
  console.log(req.body);
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
     throw new Error("User already exist!")
    }

    const user = await User.create({
      userName,
      email,
      role,
      password,
    });

    if (user) {
      res.status(201).json({
        message: "You have been registered!",
      });
    } else {
      res.status(401);
      res.json({ message: "Invalid user data" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  console.log(req.params)
  try{
    let data = await User.findById({_id: req.params.id});
    res.status(200).json(data);
  }catch (error) {
    res.status(500);
    throw new Error("server error")
  }
})

export { authUser, registerUser, adminLogin, getUserById };
