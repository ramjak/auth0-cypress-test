import { Container } from "inversify";
import * as esCookie from "es-cookie";
import axios from "axios";
import AuthService from "./services/AuthService";
import IAuthService from "./services/IAuthService";
import TYPES from "./services/types";
import IPersistentStorage from "./services/IPersistentStorage";
import IRequestService from "./services/IRequestService";
import RequestService from "./services/RequestService";
import IHttpService from "./services/IHttpService";
import IUserRepository from "./repositories/IUserRepository";
import UserRepository from "./repositories/UserRepository";

const container = new Container();

// infra block
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container
  .bind<IPersistentStorage>(TYPES.PersistentService)
  .toConstantValue(esCookie);
container.bind<IRequestService>(TYPES.RequestService).to(RequestService);
container.bind<IHttpService>(TYPES.HttpService).toConstantValue(axios);

// repository block
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

export default container;
