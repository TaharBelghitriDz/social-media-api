import { JSONSchemaType } from "ajv";
import { newPostInterface } from "interfaces/postsInterdace";

export const addPostSchema: JSONSchemaType<newPostInterface> = {
  type: "object",
  properties: {
    content: { type: "string", minLength: 1, maxLength: 4000 },
    cover: { type: "string", minLength: 10, maxLength: 1000 },
  },
  required: ["content", "cover"],
  additionalProperties: false,
};

export const addCommentSchema: JSONSchemaType<{
  content: string;
  postId: string;
}> = {
  type: "object",
  properties: {
    content: { type: "string", minLength: 1, maxLength: 4000 },
    postId: { type: "string", minLength: 10, maxLength: 1000 },
  },
  required: ["content", "postId"],
  additionalProperties: false,
};
