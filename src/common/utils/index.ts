import { NotFoundException } from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const generateNotFoundException = (route: string) => {
  throw new NotFoundException({
    statusCode: StatusCodes.NOT_FOUND,
    message: [`${route} with provided id not found`],
    error: ReasonPhrases.NOT_FOUND,
  });
};
