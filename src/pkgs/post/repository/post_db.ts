import PostModel, {Post, ValidPost} from '../../../models/post_model'


export default class PostRepository{

    public async createpost(postData: ValidPost): Promise<any>{

        try{

            const data = await PostModel.create(postData);
            return data;



        }catch(err){
            throw Error('Cannot create post')
        }

    }

    public async deletePost(postData: {token: String, postID: String, userID: String}): Promise<any>{
        try{
            const data = await PostModel.remove({"_id": postData.postID, "userID": postData.userID})
            return data;


        }catch(err){
            throw Error('Cannot delete post')


        }

    }







}