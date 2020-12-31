import bcrypt from 'bcrypt';
import UserModel, {User, AuthUser, VerifyUser} from '../../../models/user_model';

export interface UserRepo{
    createUser(user: AuthUser): Promise<User | null>;
    authUser(userAuth: AuthUser): Promise<string | null>;
    getUserById(userID: string): Promise<User | null>;
    verifyUser(userData: AuthUser): Promise<boolean>;
    fetchUsers(filters: any): Promise<User[] | null>;
    updateUser(userID: string, updates: any): Promise<User | null>;
    deleteUser(userID: string): Promise<any>;


}

export default class MongoUserRepo implements UserRepo{

    public async createUser(user: User): Promise<User | null>{

        try{
            const data = await UserModel.create(user);
            return data

        }catch(err){
            throw Error('User not created')

        }


    }

    public async getUserById(userID: string): Promise<User | null>{

        try{
            const data = await UserModel.findById(userID);
            return data

        }catch(err){
            throw Error('Something went wrong')

        }
    }

    public async fetchUsers(filters: any): Promise<User[] | null>{

        try{
            const data = await UserModel.find(filters);
            return data;

        }catch(err){
            throw Error('problem fetching users')
        }
        return null;

    }

    public async authUser(authData: AuthUser){
        try{
            let data;
            if(authData.userName){
                data = await UserModel.findOne({"userName": authData.userName})
            }
            else if (authData.email){
                data = await UserModel.findOne({"email": authData.email})
            }
            if (data && data.password && await bcrypt.compare(authData.password, data.password)){
                return data
            }


            return null

        }catch(err){
            throw Error("Cannot auth user")
        }
    }

    public async updateUser(userID: string, updates: any): Promise<User | null>{

        try{
            let data;
            data = await UserModel.findByIdAndUpdate(userID, {$set: updates}, {new: true})
            return data;

        }catch(err){
            throw Error("problems updating user")
        }
    }

    public async verifyUser(userData: AuthUser): Promise<boolean>{
        try{
            let data;
            if (userData.userName){
                data = await UserModel.findOne({"userName": userData.userName})
            }

            else if (userData.email){
                data = await UserModel.findOne({"email": userData.email})
            }
            if(data){
                return true
            }
            return false

        }catch(err){
            throw Error('problem verifying user')
            return false

        }
    }

    public async deleteUser(userID: String): Promise<any>{
        try{
            let data;
            data = await UserModel.findByIdAndDelete(userID)
            return data
        }catch(err){

            throw Error("problems deleting user")
        }
    }

}