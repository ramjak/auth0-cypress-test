import { inject, injectable } from "inversify";
import IAuthService from "./IAuthService";
import IPersistentStorage from "./IPersistentStorage";
import TYPES from "./types";
import { IUser } from "../contexts/UserContext";

@injectable()
export default class AuthService implements IAuthService {
  public logout() {
    return Promise.resolve();
  }

  public getAuthData() {
    return null;
  }

  public login(authData: IUser) {
    return Promise.resolve();
  }
}
