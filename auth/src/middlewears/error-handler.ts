import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
     err: Error,
     req: Request,
     res: Response,
     next: NextFunction
) => {
     if (err instanceof CustomError) {
          console.log(
               "succsses!! , coming from err-handler that inside index.ts"
          );
          return res
               .status(err.statusCode)
               .send({ errors: err.serializeErrors() });
     }

     res.status(400).send({ errors: { message: err.message } });
};
