import PostUsecase from '../usecase/post_usecase';
import {Request, Response, NextFunction} from "express";

import {ValidPost, SearchPost} from '../../../models/post_model' 

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
            if (!postData.post){
                res.json({
                    message: 'Empty post',
                    status: 400
                })
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
                success: false
            })


        }

    }

    public async getPost(req: Request, res: Response, next: NextFunction){
        try{

            const postData: SearchPost = {
                userID: req.body.userID,
                postID: req.body.postID,
                token: req.body.token
            }

            const data = await this.usecase.getPost(postData);

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
                message: "cannot get post",
                success: false
            })


        }


    }

    public async likePost(req: Request, res: Response, next: NextFunction){

        try{
            const postData: SearchPost = {
                userID: req.body.userID,
                postID: req.body.postID,
                token: req.body.token
            }
            const data = await this.usecase.likePost(postData);
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
                message: "cannot like post",
                success: false
            })



        }




    }

    public async unlikePost(req: Request, res: Response, next: NextFunction){
        try{

            const postData: SearchPost = {
                userID: req.body.userID,
                postID: req.body.postID,
                token: req.body.token
            }
            const data = await this.usecase.unlikePost(postData);
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
                message: "cannot unlike post",
                success: false
            })

            
        }
    }

    public async editPost(req: Request, res: Response, next: NextFunction){
        try{
            const postData: SearchPost = {
                userID: req.body.userID,
                postID: req.body.postID,
                token: req.body.token,
                post: req.body.post
            }

            if (!postData.post){
                res.json({
                    message: 'Empty post',
                    status: 400
                })
            }

            const data = await this.usecase.editPost(postData);
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
                message: "cannot edit post",
                success: false
            })




        }

    }

    public async fetchPostsById(req: Request, res: Response, next: NextFunction){

        try{
            const postData = {
                userID: req.body.userID,
                postID: req.body.postID,
                token: req.body.token
            }

            const data = await this.usecase.fetchPostsById(postData);

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
                message: "cannot fetch posts",
                success: false
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
