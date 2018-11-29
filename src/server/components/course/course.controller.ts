import * as Joi from 'joi';
import { Request, Response } from 'express';

import { Course, CourseType } from './course.model';
import { CourseRegistry } from './course-registry.model';

export class CourseController {
  getAllCourses = async (req: Request, res: Response) => {
    const result: CourseType[] = await Course.find({})
      .populate('department')
      .populate('faculty').exec();

    return res.status(200).json(result);
  }

  async getCourse (req: Request, res: Response) {
    const { courseId } = req.params;
    const course = await Course.findOne({ courseId })
      .populate('department')
      .populate('lecturer')
      .populate('faculty')
      .exec();

    return res.status(200).json(course);
  }

  /**
   * @method getCoursesWithCriteria
   * @summary finds and return courses that match the given criteria
   */
  async getCoursesWithCriteria(req: Request, res: Response) {
    const { criteria } = req.params;
    const { error, value } = Joi.validate(criteria, Joi.string().required());
    if (error) {
      return res.status(400).json ({ error, criteria });
    } else if (value) {
      const results: CourseType[] = await Course.find({ criteria }).exec();
      res.status(200).json(results);
    }
  }

  async deleteCourse (req: Request, res: Response) {
    const { courseId } = req.body;
    const result = await Course.findOneAndDelete({ courseId }).exec();
    return res.status(200).json(result);
  }

  async createCourse(req: Request, res: Response) {
    const { body } = req;
    const schema = Joi.object().keys({
      courseId: Joi.string().regex(/\w{3}\d{3}/).required(),
      title: Joi.string().min(10).max(30),
      department: Joi.string(),
      faculty: Joi.string(),
      assignTo: Joi.string() || [Joi.string()]
    });

    const { error, value } = Joi.validate(body, schema);
    if (error) {
      return res.status(204).json({error, body});
    } else if (value) {
      const course = new Course(body);
      await course.save();
      return res.status(201).json(course);
    }
  }

  async updateCourse (req: Request, res: Response) {
    const { courseId } = req.params;
    const { body } = req;
    const schema = Joi.object().keys({
      courseId: Joi.string().regex(/\w{3}\d{3}/).required(),
      title: Joi.string().min(10).max(30),
      department: Joi.string(),
      faculty: Joi.string(),
      assignTo: Joi.string() || [Joi.string()]
    });

    const { error, value } = Joi.validate(body, schema);
    if (error) {
      return res.status(204).json({error, body});
    } else if (value) {
      const course = await Course.findOneAndUpdate({ courseId }, body);
      return res.status(204).json(course);
    }
  }

  async getAllEntriesFromRegistry(req: Request, res: Response) {
    const result = await CourseRegistry.find({})
      .populate({
        path: 'courses'
      }).exec();

    return res.status(200).json(result);
  }

  async getEntryFromRegistry(req: Request, res: Response) {
    const { courseId } = req.body;
    const entry = CourseRegistry.findOne({ courseId })
      .populate('courses').populate('owner').exec();

    return res.status(200).json(entry);
  }
}
