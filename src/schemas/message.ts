import { JSONSchemaType } from "ajv";

const sendMessage: JSONSchemaType<{ content: string; otherId: string }> = {
  type: "object",
  properties: {
    content: { type: "string", maxLength: 1000 },
    otherId: { type: "string", maxLength: 100 },
  },
  required: ["content", "otherId"],
  additionalProperties: true,
};

const messagesSchemas: any = { sendMessage };

export default messagesSchemas;
