import CommentModel, {SearchComment, Comment, ValidComment} from '../../../models/comment_model';


interface CommentRepoI{
    createComment(commentData: ValidComment): Promise<any>;
    getComment(commentID: String): Promise<any>;
    fetchCommentsById(userID: String): Promise<any>;
    likeComment(commentData: SearchComment): Promise<any>;
    unlikeComment(commentData: SearchComment): Promise<any>;
    editComment(commentData: SearchComment): Promise<any>;
    deleteComment(commentData: SearchComment): Promise<any>;
} 

export default class CommentRepo implements CommentRepoI {

    public async createComment(commentData: ValidComment): Promise<Comment>{

        try{

            const data = await CommentModel.create(commentData);
            
            return data;



        }catch(err){
            throw Error('Cannot create post')
        }

    }

    public async getComment(commentID: String): Promise<Comment | null>{
        try{
            const data = await CommentModel.findById({"_id": commentID});
            return data;
        }catch(err){
            throw Error('Cannot get post')
        }
    }



    public async fetchCommentsById(userID: String): Promise<Comment | null>{
        try{
            console.log(userID)
            const data = await CommentModel.find({}, {"userID": userID})
            return data;


        }catch(err){
            throw Error('Cannot fetch posts')

        }

    }

    

    public async likeComment(commentData: SearchComment): Promise<any>{

        try{
            const data = await CommentModel.findOneAndUpdate({"_id": commentData.commentID}, {$push: {likes: commentData.userID}});
            return data;



        }catch(err){
            throw new Error('cannot like post')


        }



    }

    public async unlikeComment(commentData: SearchComment): Promise<Comment | null>{

        try{
            const data = await CommentModel.findOneAndUpdate({"_id": commentData.commentID}, {$pull: {likes: commentData.userID}});
            return data;


        }catch(err){
            throw new Error('cannot unlike post')


        }


    }

    public async editComment(commentData: SearchComment): Promise<Comment | null>{
        try{
            const data = await CommentModel.findByIdAndUpdate(commentData.commentID, {$set: {"comment": commentData.comment}}, {new: true})
            return data;

        }catch(err){

            throw Error('cannot edit post')


        }


    }

    public async editCommentChildren(commentData: ValidComment): Promise<any>{
        try{
            const data = await CommentModel.findOneAndUpdate({"_id": commentData.parentID}, {$push: {comments: commentData.otherID}});
            return data

        }catch(err){
            throw Error('cannot add children')
        }


    }

    public async deleteComment(commentData: SearchComment): Promise<any>{
        try{
            const data = await CommentModel.remove({"_id": commentData.commentID, "userID": commentData.userID})
            return data;
        

        }catch(err){
            throw Error('Cannot delete post')


        }

    }




}
