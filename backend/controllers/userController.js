import express from "express";
import { User } from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export const register = async(req,res)=>{
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(200).json({message: "All fields are required"});
        }

        if(password !== confirmPassword){
            return res.status(400).json({message: "Password do not match"});
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message: "Username already exit try different",
                user:user
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const maleProfilePhoto = `https://i.pravatar.cc/150?u=a042581f4e29026704d`;
        const femaleProfilePhoto = `https://i.pravatar.cc/150?u=a042581f4e29026704d`;
        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender==="male"?maleProfilePhoto:femaleProfilePhoto,
            gender            
        });
        return res.status(201).json({
            message: "Account created successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            message: "Error has occured",
            error
        })
    }
}

export const login = async(req, res)=>{

    const{username, password} = req.body;

    try{

        // const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({message: "Incorrect username or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            });
        };

        const tokenData = {
            userId: user._id
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn:'10d'});

        // const token = xy

        // return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite:'strict'}).json({
        //     _id:user._id,
        //     username: user.username,
        //     fullName: user.fullName,
        //     profilePhoto: user.profilePhoto
        // })
        
return res.status(200).cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: false
}).json({
    _id: user._id,
    username: user.username,
    fullName: user.fullName,
    profilePhoto: user.profilePhoto
});



        

    } catch(error){
        console.log(error);
        return res.json({
            message: "Error has occured",
            error
        })
    }
}

export const logout = (req,res) => {

    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "Logged out successfully."
        })

    } catch(error){
        console.log(error);
        return res.json({
            message: "Error has occured",
            error
        })
    }
}

export const getOtherUsers = async(req, res) => {
 // it give other users that has not loged in i.e other users
    try{
        const loggedInUserId = req.id;
        // const otherUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password username"); //this is not possible both inclusion and exclusion is not possible at a same time // it gives when id is not equal to this
        const otherUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password"); // it gives when id is not equal to this
        return res.status(200).json(otherUsers);

    } catch(error){
        console.log(error);
        return res.json({
            message: "Error has occured",
            error
        })
    }
}