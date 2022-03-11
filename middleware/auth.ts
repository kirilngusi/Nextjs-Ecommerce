import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const auth = async (req:any, res:any) => {
    const authHeader = req.header("Authorization");
    
}