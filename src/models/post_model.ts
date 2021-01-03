import {Document, Model, model, Types, Schema, Query} from 'mongoose';


const PostSchema = new Schema({

    userID: {
        type: String
    },

    likes: {
        type: Number
    },

    post: {
        type: String
    },

    comments: [
        {
            type: String
        }
    ],

    author: {
        type: String
    },


    repost: {
        type: Boolean
    }
    
})


export interface Post extends Document{
    userID: String,
    likes?: Number,
    comments?: String[],
    post: String,
    author: String,
    repost?: Boolean
}


export interface ValidPost{

    userID: Post["userID"],
    post: Post["post"],
    repost?: Post['repost'],
    author: Post["author"],
    token: String

}

export default model<Post>("Post", PostSchema)