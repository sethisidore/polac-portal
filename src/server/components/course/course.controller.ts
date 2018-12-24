import * as Joi from 'joi';
import { Request, Response } from 'express';

import { Course, CourseType } from './course.model';
import { CourseRegistry } from './course-registry.model';

export class CourseController {
  getAllCourses = async (req: Request, res: Response) => {
    const results: CourseType[] = await Course.find({}).exec();
    results.map(async (course) => {
      course.populate({ path: 'department', model: 'Department'})
        .populate({ path: 'assignedTo', model: 'User', populate: {
          path: 'cadetDetail', model: 'Cadet' }
      }).execPopulate();
    });
    return res.status(200).json(results);
  }

  async getCourse (req: Request, res: Response) {
    const { courseId } = req.params;
    const course = await Course.findOne({ courseId }).exec();
    await course.populate({ path: 'department', model: 'Department' })
      .populate({ path: 'assignedTo', model: 'User', populate: { path: 'cadetDetail', model: 'Cadet'}
    }).execPopulate();

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
      results.map(async (course) => {
        await course.populate({ path: 'department', model: 'Department'})
          .populate({ path: 'assignedTo', model: 'User', populate: {
            path: 'cadetDetail', model: 'Cadet' }
        }).execPopulate();
      });
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

    const { error, value } = Joi.validate(body, courseSchema);
    if (error) {
      return res.status(400).json({error, body});
    } else if (value) {
      const course = new Course(body);
      await course.save();
      return res.status(200).json(course);
    }
  }

  async updateCourse (req: Request, res: Response) {
    const { courseId } = req.params;
    const { body } = req;

    const { error, value } = Joi.validate(body, courseSchema);
    if (error) {
      return res.status(400).json({error, body});
    } else if (value) {
      const course = await Course.findOneAndUpdate({ courseId }, body);
      return res.status(200).json(course);
    }
  }

  async getAllEntriesFromRegistry(req: Request, res: Response) {
    const result = await CourseRegistry.find({}).exec();
    result.map(async (entry) => {
      await entry.populate({ path: 'faculty', model: 'Faculty'}).execPopulate();
    });

    return res.status(200).json(result);
  }

  async getEntryFromRegistry(req: Request, res: Response) {
    const { courseId } = req.body;
    const entry = CourseRegistry.findOne({ courseId })
      .populate('courses').populate('owner').exec();

    return res.status(200).json(entry);
  }

  async saveEntry(req: Request, res: Response) {
    const { body, user } = req;
    const { error, value } = Joi.validate(body, registrySchema);
    if (error) {
      return res.status(400).json({error, body});
    } else if (value) {
      const entry = new CourseRegistry({
        registeredBy: user.id,
        registeredOn: new Date(Date.now()),
        courses: body.courses,
        session: body.session
      });
      await entry.save();
      return res.status(201).json(entry);
    }
  }
}

/**************************************************
 * Schema to validate inputs
 **************************************/

const courseSchema: Joi.ObjectSchema = Joi.object().keys({
  courseId: Joi.string().required(),
  title: Joi.string().required(),
  level: Joi.number().required(),
  creditLoad: Joi.number().required(),
  semester: Joi.string().regex(/first|second/),
  department: Joi.string().optional(),
  assignedTo: [Joi.string().optional()]
});

const registrySchema: Joi.ObjectSchema = Joi.object().keys({
  registeredBy: Joi.string().required(),
  registeredOn: Joi.date().required(),
  session: Joi.string().regex(/`${Joi.date()}\/${Joi.date()}`/).required(),
  courses: [{
    courseId: Joi.string().required(),
    status: Joi.string().required().regex(/carry over|current/)
  }]
});
