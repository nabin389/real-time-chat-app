import express from "express";
import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const sendMessage = async(req, res)=>{

    try{
        const senderId = req.id;
        const receiverId = req.params.id; // both works
        // const {receiverId} = req.params; name must me sme
        const {message} = req.body;

        let gotConversation = await Conversation.findOne({  // dont use const here use let
            participants:{$all: [senderId, receiverId]},  // all operator find by our id
        });


        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        }

        await gotConversation.save();

        // SOCKET ID 

        return res.status(201).json({
            // message: "Message send successfully."
            newMessage
        })

    } catch(error){
        console.log("Error: ", error);
    }
}




export const getMessage = async(req, res) => {

    try{

        const receiverId = req.params.id;
        const senderId = req.id;

        console.log("senderId:", senderId);
        console.log("receiverId:", receiverId);

        // const conversation = await Conversation.findOne({
        //     participants:{$all: [senderId, receiverId]}
        // }).populate("messages")

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]} 
        }).populate("messages");

        // const conversation = await Conversation.find({});
        // return res.json({
        //     message: "this is testing",
        //     conversation: conversation
        // })

        // this populate function display all the message from that particular id
        console.log("Focus from here: ", conversation);
        // console.log(conversation) 
        // return res.status(200).json(conversation?.messages);
        return res.json({
            message: "This is received Message",
            conversation
        })

    } catch(error){
        console.log("Error: ", error);
    }
}