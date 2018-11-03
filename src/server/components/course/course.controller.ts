import { Request, Response } from 'express';
import { Course, CourseType } from './course.model';
import { CourseRegistry } from './course-registry.model';

export class CourseController {
  getAllCourses = async (req: Request, res: Response) => {
    const result: CourseType[] = await Course.find({})
      .populate('department')
      .populate('faculty').exec();

    res.status(200).json(result);
  }

  async getCourse (req: Request, res: Response) {
    const { courseId } = req.body;
    const course = await Course.findOne({ courseId })
      .populate('department')
      .populate('lecturer')
      .populate('faculty')
      .exec();

    res.status(200).json(course);
  }

  async deleteCourse (req: Request, res: Response) {
    const { courseId } = req.body;
    const result = await Course.findOneAndDelete({ courseId }).exec();
    res.status(200).json(result);
  }

  async createCourse(req: Request, res: Response) {
    // implementation
  }

  async updateCourse (req: Request, res: Response) {
    // implementation
  }

  async getAllEntriesFromRegistry(req: Request, res: Response) {
    const result = await CourseRegistry.find({})
      .populate({
        path: 'courses'
      }).exec();

    res.status(200).json(result);
  }

  async getEntryFromRegistry(req: Request, res: Response) {
    const { courseId } = req.body;
    const entry = CourseRegistry.findOne({ courseId })
      .populate('courses').populate('owner').exec();

    res.status(200).json(entry);
  }
}
