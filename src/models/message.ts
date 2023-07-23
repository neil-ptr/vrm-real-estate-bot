import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IMessage extends Document {
  chatId: string;
  from: "user" | "ai";
  text: string;
  createdAt: number;
}

const MessageSchema: Schema = new Schema({
  chatId: {
    type: String,
  },
  from: {
    type: String,
  },
  text: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
});

export const Message = (mongoose.models.Message ||
  model("Message", MessageSchema)) as Model<IMessage>;
