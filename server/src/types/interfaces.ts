import { IUser } from "../models/User.model";

export interface CustomRequest extends Request {
    user?: IUser; // Type for userId
  }
  