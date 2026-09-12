// const express = require('express');
import express from 'express'
// const multer = require('multer');
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //where to store coming file if error null else store in uploads folder which is present in root directory
        cb(null, "uploads/");
    },

     //what is the name of file
    filename: function(req, file, cb){
        cb(null, Date.now()+"-"+file.originalname)
    }
})
export{multer, storage};
