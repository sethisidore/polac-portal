import * as Joi from 'joi';
import { Request, Response } from 'express';

import { Department, DepartmentType } from './Department.model';

export class DepartmentController {
  async getAll (req: Request, res: Response) {
    const faculties: DepartmentType[] = await Department.find({}).exec();
    return res.status(200).json(faculties);
  }

  /**
   * @method getWithCriteria
   * @summary finds department according to criteria passed to it
   */
  async getWithCriteria(req: Request, res: Response) {
    const { criteria } = req.params;
    const { error, value } = Joi.validate(criteria, Joi.string().required());
    if (error) {
      return res.status(400).json ({ error, criteria });
    } else if (value) {
      const depts: DepartmentType[] = await Department.find({ criteria }).exec();
      res.status(200).json(depts);
    }
  }

  async getOne (req: Request, res: Response) {
    const { DepartmentId } = req.body;
    const dept: DepartmentType = await Department.findOne({ DepartmentId }).exec();
    dept.populate({ path: 'headOfDepartment', model: 'User' }).execPopulate();

    return res.status(200).json(dept);
  }

  async deleteOne (req: Request, res: Response) {
    const { deptId } = req.body;
    const result = await Department.findOneAndDelete({ deptId }).exec();
    return res.status(200).json(result);
  }

  async createOne(req: Request, res: Response) {
    const { body } = req;

    const { error, value } = Joi.validate(body, deptSchema);
    if (error) {
      return res.status(204).json({ error, body });
    } else if (value) {
      const dept = new Department(body);
      await dept.save();
      return res.status(201).json(dept);
    }
  }

  async updateOne (req: Request, res: Response) {
    const { deptId } = req.params;
    const { body } = req;

    const { error, value } = Joi.validate(body, deptSchema);
    if (error) {
      return res.status(400).json({ error, body });
    } else if (value) {
      const updatedDept = await Department.findOneAndUpdate({ deptId }, body);
      return res.status(200).json(updatedDept);
    }
  }
}

/***************************************
 * deptSchemas to use for validating input
 ***************************************/
const deptSchema: Joi.ObjectSchema = Joi.object().keys({
  deptId: Joi.string().required(),
  name: Joi.string().required().min(5),
  faculty: Joi.string().optional(),
  headOfDepartment: Joi.string().optional(),
  status: Joi.object().keys({
    accreditted: Joi.boolean(),
    date: Joi.date()
  }).optional()
});
