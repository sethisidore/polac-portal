import * as Joi from 'joi';
import { Request, Response } from 'express';

import { Faculty, FacultyType } from './faculty.model';

export class FacultyController {
  async getAll(req: Request, res: Response) {
    const faculties: FacultyType[] = await Faculty.find({}).exec();
    return res.status(200).json(faculties);
  }

  async getOne(req: Request, res: Response) {
    const { facultyId } = req.body;
    const faculty: FacultyType = await Faculty.findOne({ facultyId }).exec();
    faculty.populate({ path: 'dean', model: 'User' }).execPopulate();

    return res.status(200).json(faculty);
  }

  /**
   * @method deleteOne
   * @summary deletes a faculty given by an id
   */
  async deleteOne(req: Request, res: Response) {
    const { facultyId } = req.body;
    const result = await Faculty.findOneAndDelete({ facultyId }).exec();
    return res.status(200).json(result);
  }

  async createOne(req: Request, res: Response) {
    const { body } = req;

    const { error, value } = Joi.validate(body, facultySchema);
    if (error) {
      return res.status(400).json({ error, body });
    } else if (value) {
      const faculty = new Faculty(body);
      await faculty.save();
      return res.status(201).json(faculty);
    }
  }

  async updateOne(req: Request, res: Response) {
    const { body } = req;
    const { facultyId } = req.params;

    const { error, value } = Joi.validate(body, facultySchema);
    if (error) {
      return res.status(204).json({ error, body });
    } else if (value) {
      const updatedFaculty = await Faculty.findOneAndUpdate({ facultyId }, body);
      return res.status(204).json(updatedFaculty);
    }
  }
}

/***************************************
 * schemas to use for validating input
 ***************************************/

const facultySchema = Joi.object().keys({
  facultyId: Joi.number().required(),
  name: Joi.string().required(),
  dean: Joi.string(),
});
