import * as passport from 'passport';
import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';
// import {} from 'nodemailer';
import { Request, Response } from 'express';
import { SignOptions } from 'jsonwebtoken';


import { User, UserType, Cadet, CadetType } from '../user/user.model';
import { Tips, TipsType } from './tips.model';

export class AuthController {
  /**
   *@method login
   *@summary finds a user and login the user to the system
   */
  async login(req: Request, res: Response) {
    passport.authenticate('local', (err: any, user: UserType, info: any) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      if (!user) {
        res.status(401).json({
          message: info ? info.message : 'Login Failed'
        });
      }
      if (user) {
        req.logIn(user, { session: false }, () => {
          if (err) {
            res.status(500).json(err);
            return;
          }
          // No errors! create, sign and send the token to user
          const body = {
            id: user._id,
            username: user.username,
            type: user._type,
            name: user.fullname(),
            expires: new Date(Date.now() + 500880)
          };
          const options: SignOptions = {
            algorithm: 'HS256',
            subject: user.username,
            expiresIn: 500880
          };

          const token = jwt.sign({ user: body }, process.env.SESSION_SECRET, options);
          res.status(200)
            .cookie('auth-token', token, { httpOnly: true, sameSite: true,
              expires: new Date(Date.now() + 500880),
              secure: process.env.NODE_ENV === 'production' ? true : false })
            .json(body);
        });
      }
    })(req, res);
  }

  /**
   * logout
   */
  async logout(req: Request, res: Response) {
    req.logOut();
    res.status(200);
  }

  /**
   * @method register
   * @summary registers a new user
   */
  async register(req: Request, res: Response) {
    const { body } = req;
    const { cadetDetail, /*staffDetail,*/ password } = body;
    // const { password, ...bodyPayload } = body;

    const { error, value } = Joi.validate(body, userSchema);
    if (error) {
      return res.status(400).json(error);
    } else if (value) {
      let userDetail: CadetType;

      const user = new User(body);
      await user.setPassword(password);
      if (user._type === 'staff') {
        // create staff or cadet profile for student
        // userDetail = new Staff(profile);
      } else {
        userDetail = new Cadet(cadetDetail);
        await userDetail.save();
        user.cadetDetail = userDetail._id;
        user.staffDetail = undefined;
      }
      // save the user and login the user
      await user.save();
      req.logIn(user, { session: false }, (err: any) => {
        if (err) {
          return res.status(500).json(err);
        }
        // No errors! create, sign and send the token to user
        const tokenBody = {
          id: user._id,
          username: user.username,
          type: user._type,
          name: user.fullname(),
          expires: new Date(Date.now() + 500880)
        };
        const options: SignOptions = {
          algorithm: 'HS256',
          subject: user.username,
          expiresIn: 500880
        };

        const token = jwt.sign({ user: tokenBody }, process.env.SESSION_SECRET, options);
        return res.status(200)
          .cookie('auth-token', token, { httpOnly: true, sameSite: true,
            expires: new Date(Date.now() + 500880),
            secure: process.env.NODE_ENV === 'production' ? true : false })
          .json(tokenBody);
      });
    }
  }

  /**
   * @method getStatus
   * @summary determines if the user is logged in or not
   */
  getStatus(req: Request, res: Response) {
    return !(req.user && req.user.expires > Date.now())
      ? res.status(401).json({ status: false })
      : res.status(200).json({ status: true });
  }

  /**
   * @method getTips
   */
  async getTips (req: Request, res: Response) {
    const tips: TipsType[] = await Tips.find({}).exec();
    res.status(200).json(tips);
  }

  /**
   * @method saveTips
   * @summary save suggestions given by users || guest
   */
  async saveTips (req: Request, res: Response) {
    const { body } = req;

    const { error, value } = Joi.validate(body, tipsSchema);
    if (error) {
      res.status(400).json({ error, body });
    } else if (value) {
      const tip = new Tips(body);
      await tip.save();
      res.status(201).json(tip);
    }
  }
}

/***************************************
 * schemas to use for validating input
 ***************************************/

const cadetProfileSchema: Joi.ObjectSchema = Joi.object().keys({
  cadetId: Joi.number().min(1).required(),
  squad: Joi.number().min(1).max(12).required(),
  regularCourse: Joi.number().min(1).required(),
  results: [Joi.string()]
});

const staffProfileSchema: Joi.ObjectSchema = Joi.object().keys({
  staffId: Joi.string().alphanum().required(),
  position: Joi.string().optional(),
  role: Joi.string().optional(),
  qualifications: Joi.array().optional()
});

export const userSchema: Joi.ObjectSchema = Joi.object().keys({
  username: Joi.string().min(3).required(),
  password: Joi.string().alphanum().required(),
  email: Joi.string().email(),
  cadetDetail: cadetProfileSchema.optional(),
  staffDetail: staffProfileSchema.optional(),
  _type: Joi.string().regex(/(cadet|staff)/).required(),

  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  middleName: Joi.string().min(2),
  birthday: Joi.date().required(),
  gender: Joi.string().regex(/(male|female)/).required(),
  department: Joi.string().optional(),
  faculty: Joi.string().optional(),

  passwordResetToken: Joi.string().optional(),
  passwordResetExpires: Joi.date().optional()
});

const tipsSchema: Joi.ObjectSchema = Joi.object().keys({
  email: Joi.string().email().optional(),
  subject: Joi.string().required(),
  suggestions: Joi.string().required()
});
