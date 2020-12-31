import bcrypt from 'bcrypt';

import {Document, Model, model, Types, Schema, Query} from 'mongoose';
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },

    emial: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        sparse: true,
    },

    password: {
        type: String,
        required: true
    },

    userID: {
        type: Types.ObjectId
    },

    followers: [
        {
            type: String
        }
    ],


    following: [
        {
            type: String
        }
    ]

    
})

export interface User extends Document{
    userID: String,
    userName: String,
    email: String,
    password: String,
    follower: String[],
    following: String[]
}


export interface AuthUser {
    userName: User["userName"],
    email: User["email"]
    password: User["password"]
}

export interface VerifyUser {
    userName: User["userName"],
    email: User["email"]
}


export default model<User>("User", UserSchema)