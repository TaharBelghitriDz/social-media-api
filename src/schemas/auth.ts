import { JSONSchemaType } from "ajv";

export const authSchema: JSONSchemaType<{ token: string; email: string }> = {
  type: "object",
  properties: {
    token: { type: "string", minLength: 50, maxLength: 100 },
    email: { type: "string", minLength: 10, maxLength: 50 },
  },
  required: ["token", "email"],
  additionalProperties: true,
};
