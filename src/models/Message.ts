import mongoose, { Schema, Document, Model } from "mongoose";
import { MessageAttributes } from "../types/interface";
import { SenderType } from "../types/enum";

// Interface for the Message document (what a single message instance has)
export interface MessageDocument extends Document {
  chat: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  senderType: SenderType;
  content: string;
}

// Interface for the Message model (for adding custom static methods like `build`)
interface MessageModel extends Model<MessageDocument> {
  build(attributes: MessageAttributes): MessageDocument;
}

// Schema definition
const MessageSchema = new Schema<MessageDocument>(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderType",
      required: true,
    },
    senderType: {
      type: String,
      enum: Object.values(SenderType),
      required: true,
    },
    content: { type: String, required: true },
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
MessageSchema.statics.build = (
  attributes: MessageAttributes
): MessageDocument => {
  return new Message(attributes);
};

// Model creation
const Message = mongoose.model<MessageDocument, MessageModel>(
  "Message",
  MessageSchema
);
export { Message };
