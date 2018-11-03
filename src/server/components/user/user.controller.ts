import { Request, Response } from 'express';
import { User, UserType, /*Cadet*/ } from './user.model';

export class UserController {
  /**
   * @method getAllCadets
   * @returns users which are cadets
   */
  async getAllCadets (req: Request, res: Response) {
    const _type = 'cadet';
    const result: UserType[] = await User.find({ _type }).exec();
    res.status(200).json(result);
  }

  /**
   * @method getAllStaffs
   * @returns users which are staffs
   */
  async getAllStaffs (req: Request, res: Response) {
    const _type = 'staff';
    const result: UserType[] = await User.find({ _type }).exec();
    res.status(200).json(result);
  }

  /**
   * @method getUserProfile
   * gets the profile and details of a user
   */
  async getUserProfile (req: Request, res: Response) {
    let result: UserType;
    const { username } = req.body;
    const user: UserType = await User.findOne({ username: username }).exec();
    if (user._type === 'staff') {
      result =  await user.populate({ path: 'profile', model: 'Staff'}).execPopulate();
    } else {
      result = await user.populate({ path: 'profile', model: 'Cadet'}).execPopulate();
    }
    res.status(200).json(result);
  }

  /**
   * @method changePassword
   */
  async changePassword  (req: Request, res: Response) {
    const { username } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user: UserType = await User.findOne({ username }).exec();
    const result = await user.changePassword(oldPassword, newPassword);
    res.status(203).json(result);
  }

  /**
   * @method deleteAccount
   */
  async deleteAccount (req: Request, res: Response) {
    const { username, _type } = req.user;

    if (_type === 'cadet') {
      res.status(401).json({
        message: 'A cadet cannot delete his account',
      });
    }
    const result = await User.remove({ username });
    res.status(200).json({
      messsage: 'Account deletion successful',
      result: result,
    });
  }
}
