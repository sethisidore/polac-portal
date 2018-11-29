import * as Joi from 'joi';
import { Request, Response } from 'express';

import { User, UserType } from '../';
import { userSchema } from '../auth/auth.controller'; // Joi validation schema

export class AccountController {
  /**
   * @method getProfile
   * @summary responds with the profile of current user logged in
   */
  async getProfile(req: Request, res: Response) {
    const { user } = req;
    return res.status(200).json(user);
  }

  /**
   * @method changePassword
   */
  async changePassword (req: Request, res: Response) {
    const { username } = req.params;
    const { body } = req;

    const schema = Joi.object().keys({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required()
    });

    const { error, value } = Joi.validate(body, schema);

    if (error) {
      return res.status(400).json(error);
    } else if (value) {
      const { oldPassword, newPassword } = body;
      const user: UserType = await User.findOne({ username }).exec();
      const result = await user.changePassword(oldPassword, newPassword);
      res.status(203).json(result);
    }
  }

  /**
   * @method deleteAccount
   * @summary deletes the account given by id if and only if the account/user is a staff
   */
  async deleteAccount (req: Request, res: Response) {
    const { username, _type } = req.user;

    if (_type === 'cadet') {
      res.status(401).json({
        message: 'A cadet cannot delete his account',
      });
    }
    const result = await User.remove({ username });
    return res.status(200).json({
      messsage: 'Account deletion successful',
      result: result,
    });
  }

  /**
   * @method updateAccount
   * @summary updates the detail of an account given by an id
   */
  async updateAccount(req: Request, res: Response) {
    const { cadetId } = req.params;
    const { body } = req;

    const { error, value } = Joi.validate(body, userSchema);
    if (error) {
      return res.status(400).json(error);
    } else if (value) {
      const updatedUser = await User.findOneAndUpdate({ cadetId }, body).exec();
      return res.status(203).json(updatedUser);
    }
  }
}
