import PostUsecase from '../usecase/post_usecase';
import {Request, Response, NextFunction} from "express";

import {ValidPost} from '../../../models/post_model' 

import  AuthOperation from '../../../config/auth/auth';


interface GeneralResponse {
    success: boolean;
    error?: string;
    message?: string;
    data?: any;
    token?: any
}
export default class PostHandler{

    public usecase: PostUsecase;
    constructor(usecase: PostUsecase){
        this.usecase = usecase
    };

    public async createPost(req: Request, res: Response, next: NextFunction){
        try{
            const postData: ValidPost  = {
                userID: req.body.userID,
                post: req.body.post,
                repost: req.body.repost? req.body.repost: false,
                author: req.body.author,
                token: req.body.token,
                likes: []

            }

            const data = await this.usecase.createPost(postData);

            if (data.success){
                res.json({
                    data: data.data,
                    message: data.message,
                    status: 200,
                    success: true
                })
    
            }
            else{
                res.json({
                    message: data.message,
                    status: 401,
                    success: false
                })
    
            }


        }catch(err){
            res.json({
                message: "cannot create post",
                success: 'false'
            })


        }

    }


    public async deletePost(req: Request, res: Response, next: NextFunction){
        try{
            const postData : {token: String, postID: String, userID: String} = {
                token: req.body.token,
                postID: req.body.postID,
                userID: req.body.userID
            }

            const data = await this.usecase.deletePost(postData);
            if (data.success){
                res.json({
                    data: data.data,
                    message: data.message,
                    status: 200,
                    success: true
                })
    
            }
            else{
                res.json({
                    message: data.message,
                    status: 401,
                    success: false
                })
    
            }

        }catch(err){
            res.json({
                message: "cannot delete post",
                success: 'false'
            })
        }


    }

}
