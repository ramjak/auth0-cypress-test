import { injectable } from "inversify";
import IUserRepository from "./IUserRepository";
import IUser, { IRawUser } from "../domains/user";
import TYPES from "../services/types";
import { listenerType, RepositoryState } from "./RepositoryState";

@injectable()
export default class UserRepository implements IUserRepository {
  private state = new RepositoryState<IUser>({
    data: [],
    errorMessage: undefined,
    isLoading: false,
    total: 0,
  });

  public subscribe(listener: listenerType<IUser>) {
    return this.state.subscribe(listener);
  }

  public async delete(id: string): Promise<unknown> {
    this.state.isLoading = true;
    try {
      return;
    } catch (e) {
      this.state.errorMessage = e.message;
    } finally {
      this.state.isLoading = false;
    }
  }

  public async getAll(page = 1, limit = 10): Promise<IUser[]> {
    this.state.isLoading = true;
    try {
      return [];
    } catch (e) {
      this.state.errorMessage = e.message;
      return this.state.data;
    } finally {
      this.state.isLoading = false;
    }
  }

  public getOne(id: string): Promise<IUser> {
    const sample: IUser = {
      id: '1',
      timestamp: '123',
      name: '123',
      email: '123',
      nickname: '123',
      picture: '123',
      job_title: '123',
    };
    return Promise.resolve(sample);
  }

  public async store(payload: IRawUser): Promise<unknown> {
    this.state.isLoading = true;
    try {
      // todo: store
      await this.getAll();

      return;
    } catch (e) {
      this.state.errorMessage = e.message;
    } finally {
      this.state.isLoading = false;
    }
  }

  public async update(payload: IRawUser, id: string): Promise<unknown> {
    this.state.isLoading = true;
    try {
      // todo: update

      await this.getAll();

      return;
    } catch (e) {
      this.state.errorMessage = e.message;
    } finally {
      this.state.isLoading = false;
    }
  }
}
