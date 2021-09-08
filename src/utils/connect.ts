import mongoose from "mongoose"
import { ConnectOptions } from "mongoose"
import logger from './logger'

type ConnectionOptionsExtend = {
    useNewUrlParser: boolean,
    useUnifiedTopology: boolean,
    useCreateIndex: boolean,
    useFindAndModify: boolean
}

const options : ConnectOptions & ConnectionOptionsExtend = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

export default (db: string) => {
  const connect = () => {
    mongoose
        .connect(db, options)
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