import {Document, Model, model, Schema, Types, Query} from 'mongoose';


const CommentSchema = new Schema({
    commentId: {
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
    },

    parentId: {
        type: Types.ObjectId
    }
    
})


export interface Comment extends Document{
    commentId: String,
    likes: Number,
    comments: String[],
    author: String,
    reshare: Boolean,
    repost: Boolean
}

export default model<Comment>("Comment", CommentSchema)