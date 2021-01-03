import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export default class AuthOperation{

    public async hashFunction(param: String): Promise<string>{
        try{
            const hash = await bcrypt.hash(param, 10);
            return hash;
        }
        catch(err){
            return 'error'
        }

    }


    public async jwtFunction(param: any){
        try{
            const token = jwt.sign({param}, 'secret')
            return token

        }catch(err){
            return err
        }
    }

    public async verifyJwtToken(token: any): Promise<any>{
        try{
            const verify = jwt.verify(token, 'secret');
            return verify;



        }catch(err){
            return false

        }
    }




}