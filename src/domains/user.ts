import { Asserts, object, string } from "yup";

export const userSchema = object({
  name: string().max(100).required(),
  email: string().max(100).required(),
  nickname: string().max(100).required(),
  picture: string().max(100).required(),
  job_title: string().max(15).required(),
});

export interface IRawUser extends Asserts<typeof userSchema> {}

export default interface IUser extends IRawUser {
  id: string;
  timestamp: string;
}
