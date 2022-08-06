import UserModel from "./user.model";
import User from "DTOs/user.interface";

export default class UserService {
  public async create(data: User): Promise<User> {
    return await UserModel.create(data);
  }

  public async get(): Promise<User[]> {
    return await UserModel.find();
  }

  public async getById(id: any): Promise<User | null> {
    return await UserModel.findById(id);
  }
}
