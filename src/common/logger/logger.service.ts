import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createWriteStream, WriteStream } from 'fs';
import { join } from 'path';

enum LogLevel {
  error,
  warn,
  log,
  debug,
  verbose,
}

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  private loggerLevel: number;
  private logFile: WriteStream;
  private logErrorFile: WriteStream;

  constructor(private readonly configService: ConfigService) {
    super();

    const SERVER_ROOT_DIR = this.configService.get<string>('SERVER_ROOT_DIR');
    this.loggerLevel =
      process.env.LOGGER_LEVEL in LogLevel ? +process.env.LOGGER_LEVEL : 3;

    this.logFile = createWriteStream(join(SERVER_ROOT_DIR, '/logs/app.log'), {
      flags: 'a+',
    });

    this.logErrorFile = createWriteStream(
      join(SERVER_ROOT_DIR + '/logs/error.log'),
      {
        flags: 'a+',
      },
    );
  }

  error(message: string, ...optionalParams: any[]) {
    if (LogLevel.error > this.loggerLevel) return;

    this.writeLog(LogLevel.error, message);
    if (optionalParams.length == 0) super.error(message);
    else super.error(message, optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    if (LogLevel.warn > this.loggerLevel) return;

    this.writeLog(LogLevel.warn, message);
    if (optionalParams.length == 0) super.warn(message);
    else super.warn(message, optionalParams);
  }

  log(message: string, ...optionalParams: any[]) {
    if (LogLevel.log > this.loggerLevel) return;

    this.writeLog(LogLevel.log, message);
    if (optionalParams.length == 0) super.log(message);
    else super.log(message, optionalParams);
  }

  verbose(message: string, ...optionalParams: any[]) {
    if (LogLevel.verbose > this.loggerLevel) return;

    this.writeLog(LogLevel.verbose, message);
    if (optionalParams.length == 0) super.verbose(message);
    else super.verbose(message, optionalParams);
  }

  debug(message: string, ...optionalParams: any[]) {
    if (LogLevel.debug > this.loggerLevel) return;

    this.writeLog(LogLevel.debug, message);
    if (optionalParams.length == 0) super.debug(message);
    else super.debug(message, optionalParams);
  }

  private writeLog(level: number, message: string) {
    const formatedMessage = super.getTimestamp() + ' - ' + message + '\n';

    this.writeToFile(this.logFile, formatedMessage);

    if (level == 0) this.writeToFile(this.logErrorFile, formatedMessage);
  }

  private writeToFile(stream: WriteStream, msg: string) {
    stream.write(msg);
  }

  // private rotate() {}
}
