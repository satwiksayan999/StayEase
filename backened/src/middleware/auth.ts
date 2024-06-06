//finding whether user is logged in or not middleware

import{Request , Response , NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            userId:string;   // userId is a string type request in express
        }
    }
}

const verifyToken = (req:Request ,res:Response ,next:NextFunction) =>{
    const token=req.cookies["auth_token"];

    if(!token){
        return res.status(401).json({ message:"unauthorized" });
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY as string) //  see the token is created by us and not outside
        req.userId = (decoded as JwtPayload).userId;
        next();
        
    }catch(error){
        return res.status(401).json({ message:"unauthorized" });

    }
}

export default verifyToken;