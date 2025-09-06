
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { UserRole } from '../models/UserRole';
import { AppError } from '../middleware/errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export const registerUser = async (userData: any) => {
    const { email, password, fullName, phoneNumber, dateOfBirth } = userData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new AppError('User already exists', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        password: hashedPassword,
        fullName,
        phoneNumber,
        dateOfBirth,
    });

    const userRole = await Role.findOne({ where: { name: 'user' } });
    if (userRole) {
        await UserRole.create({ userId: user.id, roleId: userRole.id });
    }

    const payload = { user: { id: user.id, role: 'user' } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5h' });

    return { token };
};

export const loginUser = async (credentials: any) => {
    const { email, password } = credentials;

    const user = await User.findOne({
        where: { email },
        include: [{ model: Role, through: { attributes: [] } }]
    });
    if (!user || !user.password) {
        throw new AppError('Invalid Credentials', 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError('Invalid Credentials', 400);
    }

    const roles = (user as any).Roles.map((role: any) => role.name);

    const payload = { user: { id: user.id, roles } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5h' });

    return { token };
};
