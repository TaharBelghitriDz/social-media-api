import { JSONSchemaType } from "ajv";
import { newPostInterface } from "interfaces/postsInterdace";

export const addPostSchema: JSONSchemaType<newPostInterface> = {
  type: "object",
  properties: {
    content: { type: "string", minLength: 1, maxLength: 4000 },
    cover: {
      type: "array",
      items: { type: "string" },
      maxItems: 5,
      default: [],
    },
  },
  required: ["content"],
  additionalProperties: false,
};

export const addCommentSchema: JSONSchemaType<newPostInterface> = {
  type: "object",
  properties: {
    content: { type: "string", minLength: 1, maxLength: 4000 },
    cover: {
      type: "array",
      items: { type: "string" },
      maxItems: 5,
      default: [],
    },
  },
  required: ["content"],
  additionalProperties: false,
};
