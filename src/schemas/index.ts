import { RequestHandler } from "express";
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

const schemaValidation =
  (schema: object): RequestHandler =>
  (req, res, next) => {
    const validate = ajv.compile(schema);
    const checkReq = validate(req.body);
    if (checkReq) next();
    else res.status(400).json({ err: "unvalid request" });
  };

export default schemaValidation;

export const emptyBody: JSONSchemaType<{}> = {
  type: "object",
  properties: {},
  required: [],
  additionalProperties: false,
};
