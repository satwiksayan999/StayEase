import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from 'express-validator';


const router = express.Router();

// /api/users/register
router.post("/register",[ 
    check("firstname" ,"firstname is required").isString() ,
    check("lastname" ,"lastname is required").isString() ,
    check("email" ,"email is required").isEmail() ,
    check("password" ,"password is required with 6 or more character").isLength({min:6}) ,

] ,async (req: Request, res: Response) => {

    try {
       
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:errors.array()});
        }
        
        let user = await User.findOne({
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" }); // sign in

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })

        return res.status(200).send({message:"user is registered successfully"});


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something bad happen" });

    }
});

export default router;
