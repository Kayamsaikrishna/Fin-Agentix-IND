
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/environment';

export const registerUser = async (userData: any): Promise<any> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await User.create({ ...userData, password: hashedPassword });
  return user;
};

export const loginUser = async (credentials: any): Promise<any> => {
  const { email, password } = credentials;
  const user = await User.findOne({ where: { email } });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
  }

  return null;
};
