
import {User, AuthUser, VerifyUser} from '../../../models/user_model' ;
import UserRepo from '../repository/user_db';
import bcrypt from 'bcrypt'
import AuthOperation from '../../../config/auth/auth';


interface GeneralResponse {
    success: boolean;
    error?: string;
    message?: string;
    data?: any;
}

interface TokenData {
    Token: string,
    ExpiresIn: number,
}

// export interface UsecaseI {
//     // createUser(user: AuthUser): Promise<Response>;
//     // authenticateUser(auth: AuthUser): Promise<any>;
//     // getUserById(userID: string): Promise<Response>;
//     // verifyUser(user: AuthUser): Promise<boolean>;
//     // fetchUsers(filter: any): Promise<Response>;
//     // updateUser(userID: string, updates: any): Promise<Response>;
//     // deleteUser(userID: string): Promise<Response>;
// }

export default class UserUsecase{

    public repo : UserRepo;
    public authOperation: any;
    constructor(repo: UserRepo){
        this.repo = repo
    }

    public async createUser(userData: AuthUser): Promise<GeneralResponse>{
        try{
            const authOperation = new AuthOperation()
            const hashedPassword: string = await authOperation.hashFunction(userData.password)
            userData.password = hashedPassword

            if (await this.repo.verifyUser(userData)){
                return {
                    success: false,
                    message: "User Already In Db"
                }

            }

            const data = await this.repo.createUser(userData);
            return {
                success: true,
                data
            }

        }catch(err){
            return {
                success: false,
                message: err
            }

        }

    }


    public async deleteUser(user: VerifyUser): Promise<GeneralResponse>{
        try{
            const authOperation = new AuthOperation()

            if(! await this.repo.verifyUser(user)){
                return {
                    success: false,
                    message: "User does not exist"
                }

            }


            const verifyToken = await authOperation.verifyJwtToken(user.token);
            console.log(verifyToken)
            if (!user.token){
                return {
                    message: "Token Required",
                    success: false,
                }

            }

            else if (!verifyToken){
                return {
                    message: "wrong token",
                    success: false,
                }
            }

            

            const data = await this.repo.deleteUser(user);
            return {
                message: "User deleted",
                success: true,
                data
            }
        }catch(err){
            console.log(err)
            return {
                message: "Problems deleting user",
                success: false,
            }
        }
    }



}