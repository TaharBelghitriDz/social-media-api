import { JSONSchemaType } from "ajv";

const sendMessage: JSONSchemaType<{
  content: string;
  otherId: string;
  pic: string;
}> = {
  type: "object",
  properties: {
    content: { type: "string", maxLength: 1000 },
    otherId: { type: "string", maxLength: 100 },
    pic: { type: "string", maxLength: 100 },
  },
  required: ["content", "otherId"],
  additionalProperties: true,
};

const reaction: JSONSchemaType<{
  reaction: string;
  otherId: string;
  messageId: string;
}> = {
  type: "object",
  properties: {
    reaction: { type: "string", maxLength: 10 },
    otherId: { type: "string", maxLength: 100 },
    messageId: { type: "string", maxLength: 100 },
  },
  required: ["reaction", "otherId", "messageId"],
  additionalProperties: true,
};

const removeMessage: JSONSchemaType<{
  otherId: string;
  messageId: string;
}> = {
  type: "object",
  properties: {
    otherId: { type: "string", maxLength: 100 },
    messageId: { type: "string", maxLength: 100 },
  },
  required: ["otherId", "messageId"],
  additionalProperties: true,
};

const getMessages: JSONSchemaType<{ range: number }> = {
  type: "object",
  properties: {
    range: { type: "number" },
  },
  required: ["range"],
  additionalProperties: true,
};

const findChats: JSONSchemaType<{ range: number; chatId: string }> = {
  type: "object",
  properties: {
    range: { type: "number" },
    chatId: { type: "string", maxLength: 100 },
  },
  required: ["range", "chatId"],
  additionalProperties: true,
};

const messagesSchemas: any = {
  sendMessage,
  reaction,
  removeMessage,
  getMessages,
  findChats,
};

export default messagesSchemas;
