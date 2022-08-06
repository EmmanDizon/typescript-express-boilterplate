import mongoose from "mongoose";

export default async (logger: any) => {
  try {
    const { DB_LOCAL_URI } = process.env;

    const result = await mongoose.connect(`${DB_LOCAL_URI}`);

    logger.debug(`Connected to mongoDB with host: ${result.connection.host}`);
  } catch (err: any) {
    logger.error(err.message);
  }
};
