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
    // implementation
  }

  async updateOne (req: Request, res: Response) {
    // implementation
  }
}
