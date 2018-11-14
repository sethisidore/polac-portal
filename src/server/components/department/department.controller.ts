import * as Joi from 'joi';
import { Request, Response } from 'express';

import { Department, DepartmentType } from './Department.model';

export class DepartmentController {
  async getAll (req: Request, res: Response) {
    const faculties: DepartmentType[] = await Department.find({}).exec();
    res.status(200).json(faculties);
  }

  async getOne (req: Request, res: Response) {
    const { DepartmentId } = req.body;
    const dept: DepartmentType = await Department.findOne({ DepartmentId }).exec();
    dept.populate({ path: 'dean', model: 'User' }).execPopulate();

    res.status(200).json(dept);
  }

  async deleteOne (req: Request, res: Response) {
    const { deptId } = req.body;
    const result = await Department.findOneAndDelete({ deptId }).exec();
    res.status(200).json(result);
  }

  async createOne(req: Request, res: Response) {
    const { body } = req;
    const schema = Joi.object().keys({
      deptId: Joi.string(),
      name: Joi.string().required().min(5),
      faculty: Joi.string(),
      headOfDepartment: Joi.string(),
      status: Joi.object().keys({
        accreditted: Joi.boolean(),
        date: Joi.date()
      })
    });

    const { error } = Joi.validate(body, schema);
    if (error) {
      res.status(204).json({ error, body });
    }
    const dept = new Department(body);
    await dept.save();
    res.status(201).json(dept);
  }

  async updateOne (req: Request, res: Response) {
    const { deptId } = req.params;
    const { body } = req;
    const schema = Joi.object().keys({
      deptId: Joi.string(),
      name: Joi.string().required().min(5),
      faculty: Joi.string(),
      headOfDepartment: Joi.string(),
      status: Joi.object().keys({
        accreditted: Joi.boolean(),
        date: Joi.date()
      })
    });

    const { error, value } = Joi.validate(body, schema);
    if (error) {
      res.status(204).json({ error, body });
    } else if (value) {
      const updatedDept = await Department.findOneAndUpdate({ deptId }, body);
      res.status(204).json(updatedDept);
    }
  }
}
