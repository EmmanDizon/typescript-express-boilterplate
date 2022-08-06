import { Router, Request, Response, NextFunction } from "express";
import Controller from "../utils/init-controller";
import ErrorHandler from "../utils/error-handler";
import validateMiddleWare from "../middleware/validation.middleware";
import validate from "../common/validations/user.validation";
import UserService from "../services/users/index";
import catchAsyncErrors from "../middleware/handle-async-errors";
import _ from "lodash";
import httpStatus from "http-status";

class UserController implements Controller {
  public path = "/user";

  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      `${this.path}`,
      validateMiddleWare(validate.user),
      this.createUsers
    );

    this.router.get(`${this.path}`, this.getUsers);

    this.router.get(`${this.path}/:id`, this.getUser);
  }

  private createUsers = catchAsyncErrors(
    async (req: Request, res: Response): Promise<void> => {
      let result: any = await this.userService.create(req.body);

      result = _.pick(result, ["firstname", "lastname", "age", "email"]);

      res.status(httpStatus.OK).json({
        success: true,
        result,
      });
    }
  );

  private getUsers = catchAsyncErrors(
    async (req: Request, res: Response): Promise<void> => {
      let result: any = await this.userService.get();

      res.status(httpStatus.OK).json({
        success: true,
        result,
      });
    }
  );

  private getUser = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      let result: any = await this.userService.getById(req.params.id);

      if (!result)
        return next(new ErrorHandler(httpStatus.NOT_FOUND, "User not found"));

      res.status(httpStatus.OK).json({
        success: true,
        result,
      });
    }
  );
}

export default UserController;
