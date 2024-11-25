import { IUser } from '../../models/User.model'; // Adjust path as necessary

declare global {
  namespace Express {
    export interface Request {
      user: IUser; // This makes user optional
    }
  }
}
