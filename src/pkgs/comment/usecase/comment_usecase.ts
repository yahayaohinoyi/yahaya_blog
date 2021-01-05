import CommentRepo from '../repository/comment_db';

import {Comment, ValidComment, SearchComment} from '../../../models/comment_model'


import AuthOperation from '../../../config/auth/auth'

interface CommentUsecaseI{
    createComment(commentData: ValidComment): Promise<any>;
    getComment(commentID: SearchComment): Promise<any>;
    fetchCommentsById(userID: SearchComment): Promise<any>;
    likeComment(commentData: SearchComment): Promise<any>;
    unlikeComment(commentData: SearchComment): Promise<any>;
    editComment(commentData: SearchComment): Promise<any>;
    deleteComment(commentData: SearchComment): Promise<any>;
} 

export default class CommentUsecase implements CommentUsecaseI{

    public repo: CommentRepo;
    constructor(repo: CommentRepo){
        this.repo = repo;
    }

    public async createComment(commentData: ValidComment){
        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(commentData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }

            const data = await this.repo.createComment(commentData);
            return {
                data,
                message: "comment created",
                success: true,
                status: 200
            }


        }catch(err){
            return{
                success: false,
                message: 'cannot create comment'
            }

        }

    }

    public async getComment(commentData: SearchComment){
        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(commentData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }
            const data = await this.repo.getComment(commentData.commentID);
            return {
                data,
                message: "comment found",
                success: true,
                status: 200
            }


        }catch(err){
            return{
                success: false,
                message: 'cannot find comment'
            }


        }
        
    }

    public async fetchCommentsById(commentData: SearchComment){
        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(commentData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }

            const data = await this.repo.fetchCommentsById(commentData.commentID);
            return {
                data,
                message: "comments fetched",
                success: true,
                status: 200
            }




        }catch(err){
            return{
                success: false,
                message: 'cannot fetch comment'
            }


        }


    }

    public async likeComment(commentData: SearchComment){

        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(commentData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }

            const data = await this.repo.likeComment(commentData);
            return {
                data,
                message: "comment liked",
                success: true,
                status: 200
            }

        }catch(err){
            return{
                success: false,
                message: 'cannot like comment'
            }

        }
    }

    public async unlikeComment(commentData: SearchComment){
        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(commentData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }

            const data = await this.repo.unlikeComment(commentData);
            return {
                data,
                message: "comment unliked",
                success: true,
                status: 200
            }

        }catch(err){
            return{
                success: false,
                message: 'cannot unlike comment'
            }
        }
    }

    public async editComment(commentData: SearchComment){
        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(commentData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }
            const data = await this.repo.editComment(commentData);
            return {
                data,
                message: "comment edited",
                success: true,
                status: 200
            }


        }catch(err){
            return{
                success: false,
                message: 'cannot edit comment'
            }
        }

    }

    public async deleteComment(commentData: SearchComment){

        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(commentData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }

            const data = await this.repo.deleteComment(commentData);
            return {
                data,
                message: "comment deleted",
                success: true,
                status: 200
            }


        }catch(err){
            return{
                success: false,
                message: 'cannot delete comment'
            }

        }


    }








}