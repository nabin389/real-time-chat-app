import express from "express";
import { User } from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/sendEmail.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// for nodemailer
// this is not needed this wass only for testing
export const test = async (req, res) => {
  const { title, email } = req.body;

  const sendData = {
    to: email,
    subject: "Successful Registration",
    text: `Welcome to our page, ${email}`,
  };
  await sendEmail(sendData);

  return res.json({
    message: "data comes here",
    title,
    email,
    sendData,
  });
};

// for multer
export const registerMulter = async (req, res) => {
  const userData = JSON.parse(req.body.user);
  // console.log("this is user", user);
  try {
    // const {fullName, username, password, confirmPassword, gender} = req.body;
    const { fullName, username, email, password, confirmPassword, gender } =
      userData;

    // console.log("this is request.body", userData);

    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      return res.status(200).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username already exit try different", user: user });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // For default image
    // const maleProfilePhoto = `https://cdn-icons-png.flaticon.com/512/3135/3135715.png`;
    // const femaleProfilePhoto = `https://cdn-icons-png.flaticon.com/512/6997/6997662.png`;

    const file = req.file;
    if (!file) {
      return res.json({
        message: "Profile Picture is Required",
      });
    }

    const filePath = file.filename;

    //         const profilePhoto = `http://localhost:3000/uploads/${filePath}`
    //         return res.json({
    //     message: "working till here ",
    //     fullName,
    //     username,
    //     password,
    //     hashedPassword,
    //     gender,
    //     profilePhoto

    // })

    await User.create({
      fullName,
      username,
      password: hashedPassword,
      // profilePhoto: gender==="male"?maleProfilePhoto:femaleProfilePhoto,
      profilePhoto: `http://localhost:3000/uploads/${filePath}`,
    });

    const sendData = {
      to: email,
      subject: "Successful Registration",
      text: `Welcome to our page, ${email}`,
    };
    await sendEmail(sendData);

    return res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Error has occured",
      error,
    });
  }
};

// this is used for solving refresh problem
export const getCurrentUser = async (req, res) => {
  const id = req.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({
        message: "User not found",
      });
    }

    return res.json({
      message: "This is user data",
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      profilePhoto: user.profilePhoto,
    });
  } catch (error) {
    return res.json({
      message: "error has occured",
      error,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(200).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username already exit try different", user: user });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // normally
    // const maleProfilePhoto = `https://i.pravatar.cc/150?u=a042581f4e29026704d`;
    // const femaleProfilePhoto = `https://i.pravatar.cc/150?u=a042581f4e29026704d`;

    // give image if id provided
    // const maleProfilePhoto = `https://api.dicebear.com/10.x/adventurer/svg?seed=male-${user._id}`;
    // const femaleProfilePhoto = `https://api.dicebear.com/10.x/adventurer/svg?seed=female-${user._id}`;

    //for mr best
    // const maleProfilePhoto = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6MWyBbivsR1zt7dl8rKSYnQzTrMP1Sf9BU5WohTC2Q&s`;

    // For default image
    const maleProfilePhoto = `https://cdn-icons-png.flaticon.com/512/3135/3135715.png`;
    const femaleProfilePhoto = `https://cdn-icons-png.flaticon.com/512/6997/6997662.png`;

    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    return res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Error has occured",
      error,
    });
  }
};

// For Claudinary
export const registerClaudinary = async (req, res) => {
  console.log("control come to register claudinary");

  try {
    const userData = JSON.parse(req.body.user);
    // const userData = req.body;
    console.log("This is userdata: ", userData);
    // 1. claudinay setup
    // 2. then upload data on database

    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      // Click 'View API Keys' above to copy your API secret
    });

    const file = req.file;
    console.log("This is file: ", file);
    if (!file) {
      return res.json({
        message: "Profile Picture is Required",
      });
    }

    // upload on claudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    console.log("after claudinary");
    console.log(uploadResult);

    // then delete from our device
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log("Error occured: ", err);
      } else {
        console.log("Deleted file: ", req.file.path);
      }
    });

    const { fullName, username, email, password, confirmPassword, gender } =
      userData;

    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      return res.status(200).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "Username already exit try different", user: user });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // For default image

    const userAccount = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      profilePhoto: uploadResult.secure_url,
      gender,
    });

    const sendData = {
      to: email,
      subject: "Successful Registration",
      text: `Welcome to our page, ${email}`,
    };
    await sendEmail(sendData);

    return res.status(201).json({
      message: "Account created successfully",
      userAccount: userAccount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error has occured",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // const {username, password} = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d",
    });

    // const token = xy

    // return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite:'strict'}).json({
    //     _id:user._id,
    //     username: user.username,
    //     fullName: user.fullName,
    //     profilePhoto: user.profilePhoto
    // })

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000, // 1o days
        httpOnly: true,
        // sameSite: "lax",
        sameSite: "none",
        secure: true,
      })
      .json({
        message: "Login Successfully!",
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error has occured",
      error,
    });
  }
};

export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: "Logged out successfully.",
      });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error has occured",
      error,
    });
  }
};
// export const logout = (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully.",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       message: "Error has occured",
//       error,
//     });
//   }
// };

export const getOtherUsers = async (req, res) => {
  // it give other users that has not loged in i.e other users
  try {
    const loggedInUserId = req.id;
    // const otherUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password username"); //this is not possible both inclusion and exclusion is not possible at a same time // it gives when id is not equal to this
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password",
    ); // it gives when id is not equal to this
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error has occured",
      error,
    });
  }
};

// it works
export const deleteUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const existingUser = await User.findById(id);
    // if(existingUser){
    //     return res.json({
    //         message: "User Exist",
    //         existingUser
    //     })
    // }
    // else{
    //     return res.json({
    //         message: "User not exit"
    //     })
    // }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.json({
        message: "User not found",
      });
    }

    return res.json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    return res.json({
      message: "Error has occured",
      Error: error,
    });
  }
};
