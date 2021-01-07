import PostModel, {Post, ValidPost, SearchPost} from '../../../models/post_model'


export default class PostRepository{

    public async createpost(postData: ValidPost): Promise<any>{

        try{

            const data = await PostModel.create(postData);
            return data;



        }catch(err){
            throw Error('Cannot create post')
        }

    }

    public async getPost(postID: String): Promise<any>{
        try{
            const data = await PostModel.findById({"_id": postID});
            return data;
        }catch(err){
            throw Error('Cannot get post')
        }
    }



    public async fetchPostsByID(userID: String): Promise<any>{
        try{
            const data = await PostModel.find({"userID": userID})
            return data;


        }catch(err){
            throw Error('Cannot fetch posts')

        }

    }

    

    public async likePost(postData: SearchPost): Promise<any>{

        try{
            const data = await PostModel.findOneAndUpdate({"_id": postData.postID}, {$push: {likes: postData.userID}});
            return data;



        }catch(err){
            throw new Error('cannot like post')


        }



    }

    public async unlikePost(postData: {token: String, postID: String, userID: String}): Promise<any>{

        try{
            const data = await PostModel.findOneAndUpdate({"_id": postData.postID}, {$pull: {likes: postData.userID}});
            return data;


        }catch(err){
            throw new Error('cannot unlike post')


        }


    }

    public async editPost(postData: SearchPost): Promise<any>{
        try{
            const data = await PostModel.findByIdAndUpdate(postData.postID, {$set: {"post": postData.post}}, {new: true})
            return data;

        }catch(err){

            throw Error('cannot edit post')


        }

    }

    public async editPostChildren(postData: SearchPost): Promise<any>{
        try{
            const data = await PostModel.findOneAndUpdate({"_id": postData.postID}, {$push: {comments: postData.otherID}});
            return data

        }catch(err){
            throw Error('cannot add children')
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