import PostRepo from '../repository/post_db';

import {Post, ValidPost, SearchPost} from '../../../models/post_model'


import AuthOperation from '../../../config/auth/auth'


export default class PostUsecase{
    public repo: PostRepo;
    constructor(repo: PostRepo){
        this.repo = repo;
    }

    public async createPost(postData: ValidPost): Promise<any>{
        try{

            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(postData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }

            const data = await this.repo.createpost(postData)
            return {
                success: true,
                message: 'post created',
                data
            };



        }catch(err){
            return{
                success: false,
                message: 'cannot create post'
            }


        }


    }

    public async getPost(postData: SearchPost): Promise<any>{
        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(postData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }

            const data = await this.repo.getPost(postData.postID);
            return {
                success: true,
                status: 200,
                data,
                message: 'post found'
            }




        }catch(err){
            return{
                success: false,
                message: 'cannot get post'
            }

        }


    }

    public async likePost(postData: SearchPost){
        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(postData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }

            const data = await this.repo.likePost(postData);

            return {
                data,
                message: 'post liked',
                success: true,
                status: 200,
            }



        }catch(err){

            return {
                message: 'cannot like post',
                success: false
            }



        }


    }

    public async unlikePost(postData: SearchPost){

        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(postData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }
        const data = await this.repo.unlikePost(postData);
        return {
            data,
            message: 'post unliked',
            success: true,
            status: 200
        }




        }catch(err){
            return {
                message: 'cannot unlike post',
                success: false,
                status: 400
            }

        }


    }

    public async editPost(postData: SearchPost){
        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(postData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }

            const data = await this.repo.editPost(postData);
            return {      
                message: 'post edited',
                success: true,
                status: 200,
                data
            }


        }catch(err){
            return {
                message: 'cannot edit post',
                success: false,
                status: 400
            }



        }
    }



    public async fetchPostsById(postData: SearchPost): Promise<any>{
        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(postData.token)){
                return {
                    success: false,
                    message: "Wrong Token"
                }
            }

            const data = await this.repo.fetchPostsByID(postData.userID);
            return {
                data,
                success: true,
                message: "posts fetched"
            }


        }catch(err){
            return{
                success: false,
                message: "problems fetching posts "
            }


        }



    }



    public async deletePost(postData: SearchPost): Promise<any>{
        try{
            const authOperation = new AuthOperation();
            if (!await authOperation.verifyJwtToken(postData.token)){

                return {
                    success: false,
                    message: "Wrong token"
                }

            }


            const data = await this.repo.deletePost(postData);
            return {
                success: true,
                message: "post deleted",
                data
            }


        }catch(err){
            return {
                success: false,
                message: "problems deleting post"
            }


        }

    }




}