import mongoose from "mongoose";
import { Type } from "typescript";

export default async (logger: any) => {
  const { DB_LOCAL_URI } = process.env;

  const result = await mongoose.connect(`${DB_LOCAL_URI}`);

  logger.debug(`Connected to mongoDB with host: ${result.connection.host}`);
};
