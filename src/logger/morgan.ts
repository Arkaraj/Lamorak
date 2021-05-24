import morgan from "morgan";
import logger from "./log";
import { Logger } from "winston";

const logStream = {
  write: (message: string): Logger => logger.info(message),
};

const log = morgan("dev", { stream: logStream });

export default log;
