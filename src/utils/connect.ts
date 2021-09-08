import mongoose from "mongoose"
import logger from './logger'

export default (db: string) => {
  const connect = () => {
    mongoose
        .connect(db)
        .then(() => {
            logger.info('connected to MongoDB')
        })
        .catch(error => {
            logger.error('error connecting to MongoDB:', error.message)
            return process.exit(1);
        });
  };
  connect();

  mongoose.connection.on("disconnected", connect);
};