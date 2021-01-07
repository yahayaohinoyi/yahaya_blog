import {Document, Model, model, Schema, Types, Query} from 'mongoose';


const CommentSchema = new Schema({
    userID: {
        type: String,

    },

    likes: [
        {
            type: String
        }
    ],
    comment: {
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


    parentID: {
        type: Types.ObjectId
    }
    
})


export interface Comment extends Document{
    likes: String[],
    comments: String[],
    comment: String,
    author: String,
    userID: String,
    parentID: String,
}

export interface ValidComment{
    userID: Comment["userID"],
    comment: Comment["comment"],
    parentID: Comment["parentID"],
    token: String,
    author: Comment["author"],
    likes: Comment["likes"],
    comments: Comment["comments"]

}

export interface SearchComment{
    userID: Comment["userID"],
    token: String,
    commentID: String,
    comment?: String,
    parentID?: String,
    likes?: String[]
}

export default model<Comment>("Comment", CommentSchema)