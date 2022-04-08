import { JSONSchemaType } from "ajv";
import { userLogin, userSignUp } from "../interfaces/userInterface";

export const loginSchema: JSONSchemaType<userLogin> = {
  type: "object",
  properties: {
    email: { type: "string", minLength: 10, maxLength: 50 },
    password: { type: "string", minLength: 8, maxLength: 50 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export const signUpSchema: JSONSchemaType<userSignUp> = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 5, maxLength: 15 },
    lastName: { type: "string", minLength: 5, maxLength: 30 },
    email: { type: "string", minLength: 10, maxLength: 50 },
    password: { type: "string", minLength: 8, maxLength: 50 },
    checkPassword: { type: "string", minLength: 8, maxLength: 50 },
  },
  required: ["firstName", "email", "lastName", "password", "checkPassword"],
  additionalProperties: false,
};
