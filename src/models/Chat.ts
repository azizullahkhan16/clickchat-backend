import mongoose, { Schema, Document, Model } from "mongoose";
import { ChatAttributes } from "../types/interface";

// Interface for the Chat document (what a single chat instance has)
export interface ChatDocument extends Document {
  session: mongoose.Types.ObjectId;
  lead: mongoose.Types.ObjectId;
}

// Interface for the Chat model (for adding custom static methods like `build`)
interface ChatModel extends Model<ChatDocument> {
  build(attributes: ChatAttributes): ChatDocument;
}

// Schema definition
const ChatSchema = new Schema<ChatDocument>(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

// Static `build` method for type-safe object creation
ChatSchema.statics.build = (attributes: ChatAttributes): ChatDocument => {
  return new Chat(attributes);
};

// Model creation
const Chat = mongoose.model<ChatDocument, ChatModel>("Chat", ChatSchema);
export { Chat };
