import express, { request } from 'express';
import  datamodel  from '../model/userSchema.js';


export const createuserData = async(req, res)=>{
    try{
        const userData = new datamodel(req.body);
        const {email} = userData;
        const userEmail = await datamodel.findOne({email});
        if (userEmail) {
            console.log('user already exist!');
            return res.status(409).json({message: 'User already exists'});
        }
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
}catch(error){
    res.status(500).json({ error:'Internal server error'});
}
}

export const fetchuserData = async(req, res)=>{
    try{
        const userData = await datamodel.find({});
        if(userData.length === 0){
        return res.status(404).json({message: "user not found"});
        }
        res.status(200).json(userData);
    }catch (error) {
        res.status(500).json({ message : "Internal server error"})
    }
};

export const updateduserData = async(req,res)=>{
    try{
         const id = req.params.id;
         const userExist = await datamodel.findOne({_id:id})
         if(!userExist){
            return res.status(404).json({message: "user not found"});
         }
         console.log("ashish+++++++++++",req.body,req.params)
         const updatedUser = await datamodel.findByIdAndUpdate(id, req.body, {new: true})
         res.status(201).json(updatedUser);
        
    }catch (error){
        res.status(500).json({error: "Internal server error"});
    }
}

export const deleteduserData = async (req, res) =>{
    try{
       const id = req.params.id;
       const userExist = await datamodel.findOne({_id:id})
       if(!userExist){
        return res.status(404).json({message:"user not found"});
       }
       await datamodel.findByIdAndDelete(id);
       res.status(201).json({message: "user deleted successfully"});
    }catch (error){
        res.status(500).json({error:"Internal server error"});
    }
}