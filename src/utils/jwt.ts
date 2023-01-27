import * as jwt from 'jsonwebtoken';
import {User} from "../entity/User.entity";

export const createJwtToken = (user: User) => {
    
  const payload = {
    id: user.id,
    user_name: user.user_name,
    user_email: user.user_email
  };
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });
};