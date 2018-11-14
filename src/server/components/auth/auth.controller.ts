import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { SignOptions } from 'jsonwebtoken';

import { UserType } from '../user/user.model';

export class AuthController {
  /**
   *@method login
   *@summary finds a user and login the user to the system
   */
  async login (req: Request, res: Response) {
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
          };
          const options: SignOptions = {
            algorithm: 'HS256',
            subject: user.username,
            expiresIn: '1h'
          };

          const token = jwt.sign({ user: body }, process.env.SESSION_SECRET, options);
          res.status(200).json({ token });
        });
      }
    })(req, res);
  }

  /**
   * logout
   */
  public logout = async (req: Request, res: Response) => {
    req.logOut();
    res.status(200);
  }

  /**
   * register
   */
  public register = async () => {
    // implementation
  }

  /**
   * status
   */
  getStatus(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return res.status(200).json({
        status: false,
      });
    }
    return res.status(200).json({
      status: true,
    });
  }

  async getProfile(req: Request, res: Response) {
    const { user } = req;
    res.status(200).json(user);
  }
}
