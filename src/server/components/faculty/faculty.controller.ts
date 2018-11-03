import { Request, Response } from 'express';
import { Faculty, FacultyType } from './faculty.model';

export class FacultyController {
  async getAll (req: Request, res: Response) {
    const faculties: FacultyType[] = await Faculty.find({}).exec();
    res.status(200).json(faculties);
  }

  async getOne (req: Request, res: Response) {
    const { facultyId } = req.body;
    const faculty: FacultyType = await Faculty.findOne({ facultyId }).exec();
    faculty.populate({ path: 'dean', model: 'User' }).execPopulate();

    res.status(200).json(faculty);
  }

  async deleteOne (req: Request, res: Response) {
    const { facultyId } = req.body;
    const result = await Faculty.findOneAndDelete({ facultyId }).exec();
    res.status(200).json(result);
  }

  async createOne(req: Request, res: Response) {
    // implementation
  }

  async updateOne (req: Request, res: Response) {
    // implementation
  }
}
