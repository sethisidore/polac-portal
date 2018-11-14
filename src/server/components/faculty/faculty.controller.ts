import * as Joi from 'joi';
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
    const { body } = req;
    const schema = Joi.object().keys({
      facultyId: Joi.number().required(),
      name: Joi.string().required(),
      dean: Joi.string(),
    });

    const { error } = Joi.validate(body, schema);
    if (error) {
      res.status(204).json({ error, body });
    }
    const faculty = new Faculty(body);
    await faculty.save();
    res.status(201).json(faculty);
  }

  async updateOne (req: Request, res: Response) {
    const { body } = req;
    const { facultyId } = req.params;

    const schema = Joi.object().keys({
      facultyId: Joi.number().required(),
      name: Joi.string().required(),
      dean: Joi.string(),
    });

    const { error, value } = Joi.validate(body, schema);
    if (error) {
      res.status(204).json({ error, body });
    } else if (value) {
    const updatedFaculty = await Faculty.findOneAndUpdate({ facultyId }, body);
    res.status(204).json(updatedFaculty);
    }
  }
}
