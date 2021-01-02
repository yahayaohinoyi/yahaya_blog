import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken'
import UserUsecase from '../usecase/user_usecase';
import {AuthUser, VerifyUser} from '../../../models/user_model'
import { emit } from "cluster";


interface GeneralResponse {
    success: boolean;
    error?: string;
    message?: string;
    data?: any;
    token?: any
}

export default class UserHandler{
    public usecase : UserUsecase;
    constructor(usecase: UserUsecase){
        this.usecase = usecase
    }


    public async createUser(req: Request, res: Response){
        try{
            const user: AuthUser = {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
            }


            const data = await this.usecase.createUser(user);
            if (!data.success){
                if (data.message === 'User Already In Db'){
                    res.json({
                        success: false,
                        message: "User Already In Db"
                    })
                    return
                }
                throw new Error("cannot create user")
            }

            const token =  jwt.sign({data}, 'dangermouse');

            data.data.password = null
            const resp: GeneralResponse = {
                success: true,
                data: data.data,
                token
            }
            res.json({
                resp
            })
            
            
        }catch(err){
            res.json({
                message: "cannot create user",
                success: false,
                status: 401,
                
            })


        }
    }

    public async deleteUser(req: Request, res: Response){
        try{
            const user: VerifyUser = {
                userName: req.body.userName ? req.body.userName : null,
                email: req.body.email? req.body.email: null,
                userID: req.body.id? req.body.id: null

            }
            const data = await this.usecase.deleteUser(user);
            if (data.success){
                res.json({
                    message: "user deleted",
                    status: 200,
                })
                return
            }

            if (data.message === "User does not exist"){
                res.json({
                    message: "User does not exist",
                    success: 200
                })
            }


        }catch(err){
            res.json({
                message: "problems deleting user",
                success: 401
            })

        }
    }

}