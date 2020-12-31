import {Document, Model, model, Schema, Types, Query} from 'mongoose';


const PostSchema = new Schema({
    postId: {
        type: Types.ObjectId
    },

    likes: {
        type: Number
    },

    comments: [
        {
            type: String
        }
    ],

    author: {
        type: String
    },

    reshare: {
        type: Boolean
    },

    repost: {
        type: Boolean
    }
    
})


export interface Post extends Document{
    postId: String,
    likes: Number,
    comments: String[],
    author: String,
    reshare: Boolean,
    repost: Boolean
}

export default model<Post>("Post", PostSchema)