import PostRepo from '../repository/post_db';

import {Post, ValidPost} from '../../../models/post_model'


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
            console.log(data)
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




}