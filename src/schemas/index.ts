import { RequestHandler } from "express";

const schemaValidation =
  (schema: object): RequestHandler =>
  (req, res, next) => {};

export default schemaValidation;
