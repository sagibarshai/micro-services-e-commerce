import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidatorError } from "../errors/validation-request-error";

export const validateRequest = (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          console.log("it's working!! coming from middlewear validate-request");
          throw new RequestValidatorError(errors.array());
     }
     next();
};
