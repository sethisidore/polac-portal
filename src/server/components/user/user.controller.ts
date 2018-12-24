import { Request, Response } from 'express';
import * as Joi from 'joi';

import { User, UserType } from './user.model';

export class UserController {
  /**
   * @method getAllCadets
   * @returns users which are cadets
   */
  async getAllCadets(req: Request, res: Response) {
    const _type = 'cadet';
    const result: UserType[] = await User.find({ _type }).exec();
    result.map(async (cadet) => {
      await cadet.populate({ path: 'department', model: 'Department' })
        .populate({ path: 'faculty', model: 'Faculty' }).execPopulate();
    });
    res.status(200).json({ result });
  }

  /**
   * @method getAllStaffs
   * @returns users which are staffs
   */
  async getAllStaffs(req: Request, res: Response) {
    const _type = 'staff';
    const result: UserType[] = await User.find({ _type }).exec();
    result.map(async (staff) => {
      await staff.populate({ path: 'department', model: 'Department' })
        .populate({ path: 'faculty', model: 'Faculty' }).execPopulate();
    });
    res.status(200).json({ result });
  }

  /**
   * @method getCadet
   * @summary returns a cadet given by an id
   */
  async getCadet(req: Request, res: Response) {
    const { cadetId } = req.params;
    const cadet = await User.findOne({ cadetId }).exec();
    await cadet.populate('profile').execPopulate();
    res.status(200).json(cadet);
  }

  /**
   * @method getStaff
   * @summary returns a staff given by an id
   */
  async getStaff(req: Request, res: Response) {
    const { staffId } = req.params;
    const staff = await User.findOne({ staffId }, { 'password' : false }).exec();
    await staff.populate('profile').execPopulate();
    res.status(200).json(staff);
  }

  /**
   * @method getStaffWithCriteria
   * @summary finds and return courses that match the given criteria
   */
  async getStaffWithCriteria(req: Request, res: Response) {
    const _type = 'staff';
    const { criteria } = req.params;
    const { error, value } = Joi.validate(criteria, Joi.string().required());
    if (error) {
      return res.status(400).json({ error, criteria });
    } else if (value) {
      const results: UserType[] = await User.find({ _type, criteria }).exec();
      res.status(200).json(results);
    }
  }

  /**
   * @method getCadetWithCriteria
   * @summary finds and return courses that match the given criteria
   */
  async getCadetWithCriteria (req: Request, res: Response) {
    const _type = 'cadet';
    const { criteria } = req.params;
    const { error, value } = Joi.validate(criteria, Joi.string().required());
    if (error) {
      return res.status(400).json({ error, criteria });
    } else if (value) {
      const results: UserType[] = await User.find({ criteria, _type }).exec();
      return res.status(200).json(results);
    }
  }
}
