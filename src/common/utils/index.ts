import { LogLevel, NotFoundException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const generateNotFoundException = (route: string) => {
  throw new NotFoundException({
    statusCode: StatusCodes.NOT_FOUND,
    message: [`${route} with provided id not found`],
    error: ReasonPhrases.NOT_FOUND,
  });
};

export const getLogLevels = (level = 1): LogLevel[] => {
  const DEFAULT_LOG_LEVELS: LogLevel[] = [
    'log',
    'error',
    'warn',
    'debug',
    'verbose',
  ];

  return DEFAULT_LOG_LEVELS.slice(0, level);
};
