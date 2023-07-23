import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IChat extends Document {
  aiRole: "buyer" | "seller" | "tenant";
  metadataId: string;
}

const ChatSchema: Schema = new Schema({
  aiRole: { type: String },
  metadataId: {
    type: String,
  },
});

export const Chat = (mongoose.models.Chat ||
  model("Chat", ChatSchema)) as Model<IChat>;
