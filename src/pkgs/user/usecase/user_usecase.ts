
import {User, AuthUser, VerifyUser} from '../../../models/user_model' ;
import UserRepo from '../repository/user_db';
import bcrypt from 'bcrypt'


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
    constructor(repo: UserRepo){
        this.repo = repo
    }

    public async createUser(userData: AuthUser): Promise<GeneralResponse>{
        try{
            const hashedPassword: string = await bcrypt.hash(userData.password, 10)
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


    public async deleteUser(userID: VerifyUser): Promise<GeneralResponse>{
        try{
            if(! await this.repo.verifyUser(userID)){
                console.log('here')
                return {
                    success: false,
                    message: "User does not exist"
                }

            }

            

            const data = await this.repo.deleteUser(userID);
            return {
                message: "User deleted",
                success: true,
                data
            }
        }catch(err){
            return {
                message: "Problems deleting user",
                success: false,
            }
        }
    }



}