import { Request, Response } from 'express';

export class AuthController {
  /**
   *
   */
  public login = async (req: Request, res: Response) => {
    // implementation goes here
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
  public status = async () => {
    // implementation goes here
  }
}
