
import { User } from '../models/User';
import { AppError } from '../middleware/errorHandler';

class CustomerService {
  async getCustomerProfile(userId: number) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] } // Don't send back the password hash
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async updateCustomerProfile(userId: number, profileData: any) {
    const { fullName, phoneNumber, dateOfBirth } = profileData;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Update the fields
    user.fullName = fullName || user.fullName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    await user.save();

    // Exclude password from the returned object
    const userObject = user.toJSON();
    delete userObject.password;

    return userObject;
  }
}

export const customerService = new CustomerService();
