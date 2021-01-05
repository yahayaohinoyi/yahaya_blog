import CommentUsecase from '../usecase/comment_usecase';
import {Request, Response, NextFunction} from "express";

import Comment, {ValidComment, SearchComment} from '../../../models/comment_model' 



interface GeneralResponse {
    success: boolean;
    error?: string;
    message?: string;
    data?: any;
    token?: any
}



export default class CommentHandler {

    public usecase: CommentUsecase;
    constructor(usecase: CommentUsecase){
        this.usecase = usecase
    };

    public async createComment(req: Request, res: Response, next: NextFunction){
        try{
            

            const commentData: ValidComment = {
                userID: req.body.userID,
                parentID: req.body.parentID,
                comment: req.body.comment,
                author: req.body.author,
                token: req.body.token,
                likes: [],
                comments : []

            }
            if (!commentData.comment){
                res.json({
                    message: 'Empty comment',
                    status: 400
                })
            }

            const data = await this.usecase.createComment(commentData);

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
                message: "cannot create comment",
                success: false
            })


        }

    }

    public async getComment(req: Request, res: Response, next: NextFunction){
        try{

            const commentData: SearchComment = {
                userID: req.body.userID,
                commentID: req.body.commentID,
                token: req.body.token
            }

            const data = await this.usecase.getComment(commentData);

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
                message: "cannot get comment",
                success: false
            })


        }


    }

    public async likeComment(req: Request, res: Response, next: NextFunction){

        try{
            const commentData: SearchComment = {
                userID: req.body.userID,
                commentID: req.body.commentID,
                token: req.body.token
            }
            const data = await this.usecase.likeComment(commentData);
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
                message: "cannot like comment",
                success: false
            })



        }




    }

    public async unlikeComment(req: Request, res: Response, next: NextFunction){
        try{

            const commentData: SearchComment = {
                userID: req.body.userID,
                commentID: req.body.commentID,
                token: req.body.token
            }
            const data = await this.usecase.unlikeComment(commentData);
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
                message: "cannot unlike comment",
                success: false
            })

            
        }
    }

    public async editComment(req: Request, res: Response, next: NextFunction){
        try{
            const commentData: SearchComment = {
                userID: req.body.userID,
                commentID: req.body.commentID,
                token: req.body.token,
                comment: req.body.comment
            }

            if (!commentData.comment){
                res.json({
                    message: 'Empty post',
                    status: 400
                })
            }

            const data = await this.usecase.editComment(commentData);
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
                message: "cannot edit comment",
                success: false
            })




        }

    }

    public async fetchCommentsById(req: Request, res: Response, next: NextFunction){

        try{
            const commentData: SearchComment = {
                userID: req.body.userID,
                commentID: req.body.commentID,
                token: req.body.token
            }

            const data = await this.usecase.fetchCommentsById(commentData);

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
                message: "cannot fetch comments",
                success: false
            })
        }
    }


    public async deleteComment(req: Request, res: Response, next: NextFunction){
        try{
            const commentData : SearchComment = {
                token: req.body.token,
                commentID: req.body.commentID,
                userID: req.body.userID
            }

            const data = await this.usecase.deleteComment(commentData);
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
                message: "cannot delete comment",
                success: 'false'
            })
        }


    }

}
